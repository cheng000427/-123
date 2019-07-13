// $(() => {
//     // 显示结算
//     $('.total-of').show();
//     $('#dialog-confirm').hide();


//     // 全选和反选
//     let abks = $('.pick-all');
//     let abk = $('.item-ck');

//     abks.on('click', function () {
//         let abs = $(this).prop('checked');
//         abk.prop('checked', abs)
//         abks.prop('checked', abs)
//     })
//     abk.on('click', function () {
//         abks.prop('checked', $('.item-list input:checked').length === abk.length)
//     })


//     // 原来是多少件
//     let sum = 1;
//     // 点击加号
//     $('.item-count>.add').on('click', function () {
//         // 获取文本内容
//         let txt = $(this).parents('.item').find('.number');
//         // 获取总和
//         let zh = $(this).parents('.item').find('.computed');
//         // 获取单价
//         let dj = $(this).parents('.item').find('.price');
//         // 获取减号
//         let jh = $(this).parents('.item').find('.reduce');
//         // 原来时多少
//         let sum = parseInt(txt.val());
//         console.log(txt);
//         sum++;
//         if (sum > 1) {
//             jh.removeClass('disabled')
//         }
//         txt.val(sum);
//         zh.text(dj.text() * sum);
//     })

//     // 点击减号
//     $('.item-count>.reduce').on('click', function () {
//          // 获取文本内容
//          let txt = $(this).parents('.item').find('.number');
//          // 获取总和
//          let zh = $(this).parents('.item').find('.computed');
//          // 获取单价
//          let dj = $(this).parents('.item').find('.price');
//          // 获取减号
//          let jh = $(this).parents('.item').find('.reduce');
//         let sum = parseInt(txt.val());
//         // 
//         if(sum===1){
//             return;
//         }
//         sum--;
//         if (sum === 1) {
//             jh.addClass('disabled')
//         }
//         txt.val(sum);
//         zh.text(dj.text() * sum);
//     })

// })



$(() => {
    // 把购物车的数据从本地存储取出来
    let jsonStr = localStorage.getItem('cartDate');
    // 判断里面是否有数据，没有为null 如果不是null的话就要生成购物车的结构
    // 用空数组装新增的数据
    let arr;
    console.log(jsonStr);
    if (jsonStr !== null) {
        // 转换成数组
        arr = JSON.parse(jsonStr);
        console.log(arr+'00000');
        // 遍历数组
        let html = '';
        arr.forEach(e => {
            html += `<div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="${e.number}">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.price * e.number}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`;
        });
        // 把结构放到div里面
        $('.item-list').html(html);
        // // 把空空如也隐藏
        $('.empty-tip').hide();
        // 把计算总和 和总数 显示
        $('.cart-header').removeClass('hidden');
        $('.total-of').removeClass('hidden');
        
    }
})