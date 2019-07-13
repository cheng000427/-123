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

    // 计算总和和总价
    function computedCountAndMoney() {
        // 计算出总和 总价
        // 根据选中的多选框,得到选中商品的id
        let totalCount = 0;
        let totalMoney = 0;
        $('.item-list input[type=checkbox]:checked').each((i, e) => {
            // 获取id
            let id = parseInt($(e).parents('.item').attr('data-id'));
            // 遍历
            arr.forEach(e => {
                if (id == e.pID) {
                    totalCount += e.number;
                    totalMoney += e.number * e.price;
                }
            })
        })
        // 修改总和总数量
        $('.total-money').text(totalMoney);
        $('.selected').text(totalCount)
    }
    // 调用
    computedCountAndMoney();


    // 全选和全不选
    $('.pick-all').on('click', function () {
        // 查看自己的当前状态
        let abks = $(this).prop('checked');
        // 设置每个商品都跟自己状态一样
        $('.item-ck').prop('checked', abks);
        // 把两个全选状态都同步
        $('.pick-all').prop('checked', abks);

        // 调用计算总和总数的函数
        computedCountAndMoney();
    })

    $('.item-ck').on('click', function () {
        // 判断是否全选
        let alls = $('.item-ck').length === $('.item-ck:checked').length;

        $('.pick-all').prop('checked', alls);

        // 调用计算总和总数的函数
        computedCountAndMoney();
    })



    // 委托方式 实现加减商品

    // 获取加号
    $('.item-list').on('click', '.add', function () {
        // 点击加号对应的文本框数字加1
        // 得到之前的数据
        let odlVal = parseInt($(this).siblings('input').val())
        // 点击加1
        odlVal++;
        // 判断当odl大于1的时候 禁用鼠标启用
        if (odlVal > 1) {
            $(this).siblings('.reduce').removeClass('disabled')
        }
        // 把新数据设置回去
        $(this).siblings('input').val(odlVal);

        // 把本地数据更新
        // 点击的按钮对应的商品id
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let obj = arr.find(e => {
            return e.pID === id
        })
        // 更新对应的数据
        obj.number = odlVal;

        // 更改完之后要覆盖回去
        let jsonStr = JSON.stringify(arr);
        localStorage.setItem('cartDate', jsonStr)

        // 重新计算总和和总数
        computedCountAndMoney();

        // 对应的商品也要计算
        $(this).parents('.item').find('.computed').text(obj.price * obj.number)
    })

      // 获取减号
      $('.item-list').on('click', '.reduce', function () {
        // 点击减号对应的文本框数字减1
        // 得到之前的数据
        let odlVal = parseInt($(this).siblings('input').val())
        // 如果当前是1就不能再减了
        if(odlVal===1){
            $(this).addClass('disabled')
            return;
        }
        // 点击加1
        odlVal--;
        // 判断当odl大于1的时候 禁用鼠标启用
        if (odlVal === 1) {
            $(this).addClass('disabled')
        }
        // 把新数据设置回去
        $(this).siblings('input').val(odlVal);

        // 把本地数据更新
        // 点击的按钮对应的商品id
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let obj = arr.find(e => {
            return e.pID === id
        })
        // 更新对应的数据
        obj.number = odlVal;

        // 更改完之后要覆盖回去
        let jsonStr = JSON.stringify(arr);
        localStorage.setItem('cartDate', jsonStr)

        // 重新计算总和和总数
        computedCountAndMoney();

        // 对应的商品也要计算
        $(this).parents('.item').find('.computed').text(ojb.price * obj.number)
    })
    $('.item-list').on('click', '.item-del', function () {
        // 因为我们的删除的动作是在点击确定之后进行，点击确定是另外一个函数了，该函数里面的this已经不是移除按钮，我们可以在这里先保存一个this
        let _this = this;// 这是一个习惯
        // 弹出一个确认框
        $("#dialog-confirm").dialog({
          resizable: false,
          height: 140,
          modal: true,
          buttons: {
            "确认": function () {
              $(this).dialog("close");
              // 把对应的商品删除
              // 把对应的结构移除
              $(_this).parents('.item').remove();
              // 把本地数据移除
              // 我们现在需要根据id获取本地存储里面的数据
              let id = parseInt($(_this).parents('.item').attr('data-id'));  
              let index = arr.findIndex((e)=>{
                return e.pID === id
              })
              console.log(index);
              arr.splice(index, 1);
              // 把数据覆盖回本地
              let jsonStr = JSON.stringify(arr);
              console.log(jsonStr);
              localStorage.setItem('cartDate', jsonStr);
              console.log(localStorage.setItem('cartDate', jsonStr))
            },
            "取消": function () {
              $(this).dialog("close");
            }
          }
        });
      });

})