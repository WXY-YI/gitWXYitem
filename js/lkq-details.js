// 页面切换
$('.pord-tab li').click(function () {
    var index = $(this).index();

    if (index == 0) {
        $('.pord-detail').css('display', 'block');
    } else {
        $('.pord-detail').css('display', 'none');
    }

    if (index == 1) {
        $('.pord-tad-comment').css('display', 'block');
    } else {
        $('.pord-tad-comment').css('display', 'none');
    }

    if (index == 2) {
        $('.pord-contact').css('display', 'block');
    } else {
        $('.pord-contact').css('display', 'none');
    }

})

// 切换的下划线
var oTabline = document.querySelectorAll('.pord-tab li i');
var oList = document.querySelectorAll('.pord-tab li');
var index = 0;

for (var i = 0; i < oList.length; i++) {
    oList[i].index = i;
    oList[i].onclick = function () {
        index = this.index;
        for (var i = 0; i < oTabline.length; i++) {
            oTabline[i].classList.remove('i-tabline');
        }
        oTabline[index].classList.add('i-tabline');
    }
}

// 图片懒加载
function offset(obj) {
    var oLeft = 0;
    var oTop = 0;
    var dbleft = obj.clientLeft;
    var dbtop = obj.clientTop;
    while (obj) {
        oLeft = oLeft + obj.offsetLeft + obj.clientLeft;
        oTop = oTop + obj.offsetTop + obj.clientTop;
        obj = obj.offsetParent;
    }
    return { left: oLeft - dbleft, top: oTop - dbtop };
}

var oImg = document.querySelectorAll('.detailbox img');

function loadImg() {
    var scrollT = document.documentElement.scrollTop;
    var windowH = document.documentElement.clientHeight;

    for (var i = 0; i < oImg.length; i++) {
        if (offset(oImg[i]).top <= (scrollT + windowH + 100)) {
            oImg[i].src = oImg[i].getAttribute('data-src');
        }
    }
};

loadImg();
window.onscroll = function () {
    loadImg();
};


// 动态添加商品列表
$(function () {

    $.ajax({
        url: 'data/lkq-details.json',
        type: 'get',
        dataType: 'json',
        cache: false,
        success: function (json) {
            var img_res = ''; // 创建空字符串
            var ximg_res = '';
            var dimg_res = '';
            var theme = '';
            var price = '';
            var gift = '';
            var spec = '';
            var codeIndex = 0;
            // 循环绑定
            var codestr = location.search.replace('?code=', '').replace(/#+$/ig, '');
            $.each(json, function (index, item) {
                // console.log(item.code)
                if (codestr == item.code) {
                    codeIndex = index;
                    // console.log(codeIndex);
                    // console.log(item.code)            
                }
            })

            img_res = `
                <div class="mark lkq-ico-comm">
                <span class="mark-txt">经典再版</span>
            </div>
                <img  code="${json[codeIndex].code}" src="./images/goods/${json[codeIndex].imgurlx[0]}" alt="" class="largeimg">
                     `;

            $('.good-imgs').html(img_res); // 单图

            ximg_res = `
                <ul class="clearfix codeul"  code="${json[codeIndex].code}">
                <li class="active" data="0">
                    <a href="###">
                        <img src="./images/goods/${json[codeIndex].imgurlx[0]}" alt="">
                    </a>
                </li>
                <li data="1">
                    <a href="###">
                        <img src="./images/goods/${json[codeIndex].imgurlx[1]}" alt="">
                    </a>
                </li>
                <li data="2">
                    <a href="###">
                        <img src="./images/goods/${json[codeIndex].imgurlx[2]}" alt="">
                    </a>
                </li>
                <li data="3">
                    <a href="###">
                        <img src="./images/goods/${json[codeIndex].imgurlx[3]}" alt="">
                    </a>
                </li>
            </ul>
                `;

            $('.picdetails').html(ximg_res); // 小图

            dimg_res = `
                    <img src="./images/goods/${json[codeIndex].imgurld[0]}" alt=""  code="${json[codeIndex].code}">
                    <img src="./images/goods/${json[codeIndex].imgurld[1]}" alt=""  code="${json[codeIndex].code}">
                    <img src="./images/goods/${json[codeIndex].imgurld[2]}" alt=""  code="${json[codeIndex].code}">
                    <img src="./images/goods/${json[codeIndex].imgurld[3]}" alt=""  code="${json[codeIndex].code}">
                `;

            $('.enlarge').html(dimg_res); // 大图

            theme = `
            <h3 class="pord-name">${json[codeIndex].title}</h3>
            <p class="pord-tips">${json[codeIndex].theme}</p>
            `;
            // $('.pord-theme').html(theme); // 标题

            json[codeIndex].theme ? $('.pord-theme').html(theme) : $('.pord-theme').html(`<h3 class="pord-name">${json[codeIndex].title}</h3>`);

            price = `
            <span class="pord-dispri">￥<strong>${json[codeIndex].price}</strong></span>
            <span class="pord-orpri">￥${json[codeIndex].original}</span>      
            `;

            $('.pord-price ').html(price); // 价格

            gift = `
            <i class="gift-mark">${json[codeIndex].gift}</i>
            <span>${json[codeIndex].gifta}</span>
            `;

            json[codeIndex].gift ? $('.pord-gift ').html(gift) : $('.pord-gift ').remove();

            // $('.pord-gift ').html(gift); // 赠品

            spec = `
            <div class="pord-sellist clearfix">
                    <label>${json[codeIndex].model}</label>
                    <ul class="m128">
                        <li class="current">
                            <div class="pord-selbox">${json[codeIndex].modela}</div>
                        </li>
                    </ul>
            </div>
            `;

            $('.main_spec').html(spec); // 枪模

        }
    });

    // 点击加入购物车
    $('.pord-btn').on('click', '.joincart-btn', function () {
        // 判断是否登陆,登陆后才可以加入购物车
        if (!localStorage.getItem('user')) {
            $('.lkq-login').css('display', 'block');
            return;
        };
        // 获取点击商品的编号
        var code = $('.largeimg').attr('code');

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
            // console.log(Object.keys(Obj).length);
            $('.popup').css('display', 'block');

        } else {
            $('.have-joined').css('display', 'block');
        }

    });
    if (localStorage.getItem('shop')) {
        var Obj = JSON.parse(localStorage.getItem('shop'));
        $('.lkq-cart-num').html(Object.keys(Obj).length);
    }
});

// 放大镜图片切换
var datanum = 0;
$('.picdetails').on('click', 'ul li', function () {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.largeimg')[0].src = $(this).find('img')[0].src;
    $('.enlarge img').eq(index).addClass('imgblock').siblings().removeClass('imgblock');
    datanum = $(this).attr('data');
});

$('.good-imgs').on('click', '.largeimg', function () {
    var index = $(this).index();
    $('.enlarge').addClass('location');
    $('.enlarge img').eq(datanum).addClass('imgblock');
    console.log(datanum);
});

$('.enlarge').on('click', 'img', function () {
    $('.enlarge').removeClass('location');
});

$('.enlarge').on('mouseout', 'img', function () {
    $('.enlarge').removeClass('location');
});

// 放大镜
var oEnla = document.querySelector('.enlarge');
var oGood_img = document.querySelector('.good-imgs');

oEnla.onmousemove = function (ev) {

    var ev = event || e;
    var maskLeft = ev.clientX - offset(oGood_img).left;
    var maskTop = ev.clientY + document.documentElement.scrollTop - offset(oGood_img).top;

    // 边界
    // x
    if (maskLeft <= 0) {
        maskLeft = 0;
    };
    if (maskLeft >= oGood_img.clientWidth) {
        maskLeft = oGood_img.clientWidth;
    };

    // y
    if (maskTop <= 0) {
        maskTop = 0;
    };
    if (maskTop >= oGood_img.clientHeight) {
        maskTop = oGood_img.clientHeight;
    };

    var oLarimgx = maskLeft / (oGood_img.clientWidth);
    var oLarimgy = maskTop / (oGood_img.clientHeight);

    var imgLeft = oLarimgx * ($('.enlarge img').eq(datanum)[0].clientWidth - oGood_img.clientWidth);
    var imgTop = oLarimgy * ($('.enlarge img').eq(datanum)[0].clientHeight - oGood_img.clientHeight);

    $('.enlarge img').eq(datanum).css('left', -imgLeft + 'px');
    $('.enlarge img').eq(datanum).css('top', -imgTop + 'px');
};


// 数量加减
// 减

$('.num-reduce').click(function () {
    var num = $(this).siblings('.input-txt').val();
    if (num <= 1) {
        $(this).css('disabled', 'false');
    } else {
        $(this).css('disabled', 'true');
        $(this).siblings('.input-txt').val(--num);

        // 储存数量
        // var code = 
    }
})

// 加

$('.num-plus').click(function () {
    var add = $(this).siblings('.input-txt').val();
    $(this).siblings('.input-txt').val(++add);
    $(this).siblings('.num-reduce').css('disabled', 'true');
})

// 购物车提示框
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

//立即购买
$('.purchase-btn').on('click', function () {
    if (!localStorage.getItem('user')) {
        $('.lkq-login').css('display', 'block')
        return;
    }
    var purchaseObj = {}
    purchaseObj[$('.picdetails').children('.codeul').attr('code')] = $('.input-txt').val();
    var JSONpurchaseObj = JSON.stringify(purchaseObj);
    localStorage.setItem('payment', JSONpurchaseObj);
    location.href = './settleAccounts.html';

})

