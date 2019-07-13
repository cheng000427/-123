
$(() => {
    // 获取id
    let id = location.search.substring(4);
    // 查找满足条件的元素
    let obj = phoneData.find(function (e, i) {
        return e.pID == id
    })
    // 修改文本
    $('.sku-name').text(obj.name);
    // 修改价钱
    $('.summary-price em').text('￥' + obj.price)
    // 修改图片
    $('.preview-img>img').attr('src', obj.imgSrc)



    // 给加入购物车注册点击事件
    $('.addshopcar').on('click', function () {
        // 我们要把 图片 名字 单价 数量 pID 存储到本地数据
        // 在这些里面，未知的只有数量，所以我们要获取数量
        let number = parseInt($('.choose-number').val());
        // 先从本地数据里面读取旧数据，然后把新旧数据叠加
        let jsonStr = localStorage.getItem('cartDate');
        // 给一个空数组
        let arr;
        // 判断是否又旧数据
        if (jsonStr === null) {
            // 没有旧数据的话就给一个空数组
            arr = []
        } else {
            // 否则就叠加在一块
            // 字符串转数组
            arr = JSON.parse(jsonStr);
        }


        // 发现一个问题，如果同一个商品被点击两次，就会出现两个同样的商品 这样最好的话就是商品的数量叠加
        // 判断当前商品的id是否出现在 localStroge 里面，如果出现，就是曾经添加过了，只叠加数量

        // find的方法  如果找到了元素就会返回该元素，但如果没找到，就返回undefined
        // 该find是jq里面的方法，
        console.log(arr);
        let isExit = arr.find(e => {
            return e.pID == id;

        });
        // 如果isExit不是undefind的话就数量叠加
        if (isExit !== undefined) {
            // 不等于undefined就数量叠加
            isExit.number += number;
        } else {
            // 如果没有出现过这个商品就新添加一个
            let newAaary = {
                pID: obj.pID,
                name: obj.name,
                price: obj.price,
                imgSrc: obj.imgSrc,
                number: number,
            }
            // 组成一个新的数组
            arr.push(newAaary);
        }
     
        console.log(isExit);
        // 要将数组转换成字符串才能存储到本地内存
        jsonStr=JSON.stringify(arr);
        localStorage.setItem('cartDate',jsonStr);
        // 跳转到购物车
        location.href = 'cart.html';
    })
})















































    // // 获取文本框
    // let chooseNumber=$('.choose-number');
    // let addBtn=$('.add');
    // let reduceBtn=$('.reduce');


    // let odl=parseInt(chooseNumber.val());
    // // 点击加号
    // addBtn.on('click',function(){
    //     // 原来时多少
    //     odl=parseInt(chooseNumber.val());
    //     odl++;
    //     if(odl>1){
    //         reduceBtn.removeClass('disabled')
    //     }
    //     chooseNumber.val(odl)
    // })


    // reduceBtn.on('click',function(){
    //     odl=parseInt(chooseNumber.val());
    //     if(odl===1){
    //         return;
    //     }
    //     odl--;
    //     if(odl===1){
    //         reduceBtn.addClass('disabled')
    //     }
    //     chooseNumber.val(odl)
    // })

    // $('.addshopcar').on('click',function(){
    //     $('.count').text(odl);
    // })

