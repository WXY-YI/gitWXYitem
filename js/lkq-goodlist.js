// 动态添加商品列表
$(function () {

    $.ajax({
        url: 'data/merge.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (json) {
            var res1 = ''; // 创建空字符串
            var res2 = '';
            var res3 = '';
            var res4 = '';
            // 循环绑定
            $.each(json, function (index, item) {
                var res = `
                    <li class="lkq-godli" code="${item.code}">
                        <a href="./lkq-details.html?code=${item.code}">
                            <img src = "${item.imgurl}" alt="">
                            <div class="good-info">
                                <p class="good-name">${item.title}</p>
                                <p class="good-pri">￥${item.price}</p>
                            </div>
                        </a>
                        <div class="hied-cart">
                            <a href="###" class="lkq-add">加入购物车</a>
                        </div>
                    </li> `;

                if (item.lkqnum <= 4) {
                    res1 += res;
                }
                if (item.lkqnum <= 8 && item.lkqnum >= 5) {
                    res2 += res;
                }
                if (item.lkqnum <= 12 && item.lkqnum >= 9) {
                    res3 += res;
                }
                if (item.lkqnum <= 16 && item.lkqnum >= 13) {
                    res4 += res;
                }
            });
            // 插入数据
            // console.log(res)
            $('.lkq-goodlist').eq(0).html(res1);
            $('.lkq-goodlist').eq(1).html(res2);
            $('.lkq-goodlist').eq(2).html(res3);
            $('.lkq-goodlist').eq(3).html(res4);
        }
    });

    // 点击加入购物车
    $('.lkq-goodlist').on('click', '.lkq-godli .hied-cart', function () {
        // 判断是否登陆,登陆后才可以加入购物车
        console.log(localStorage.getItem('user'))
        if (!localStorage.getItem('user')) {
            console.log(666);
            $('.lkq-login').css('display', 'block');
            return;
        };
        // 获取点击商品的编号
        var code = $(this).parent().attr('code');
        // 获取本地存储数据（数组）

        if (localStorage.getItem('shop')) {
            // 更新本地数据
            var Obj = JSON.parse(localStorage.getItem('shop'));
        } else {
            var Obj = {}; // 添加商品个数
        }

        if (Object.keys(Obj).indexOf(code) == -1) {

            // 设置对象的key，value
            Obj[code] = 1;
            var jsonObj = JSON.stringify(Obj);
            localStorage.setItem('shop', jsonObj);

            // 数量
            $('.lkq-cart-num').html(Object.keys(Obj).length);
            $('.popup').css('display', 'block');

        } else {
            // alert('已添加购物车请勿反复添加');
            $('.have-joined').css('display', 'block');
        }

    });
    if (localStorage.getItem('shop')) {
        var Obj = JSON.parse(localStorage.getItem('shop'));
        $('.lkq-cart-num').html(Object.keys(Obj).length);
    }
});

// 购物车提示框关闭
$('.popup-close').click(function () {
    $('.popup').css('display', 'none');
});

// 已加入关闭
$('.close').click(function () {
    $('.have-joined').css('display', 'none');
});

$('.dj_bt_buy').click(function () {
    $('.have-joined').css('display', 'none');
});