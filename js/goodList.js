// 图片切换
var activeNum = 0;
$('.picdetails').on('click', 'ul li', function () {
    $('.picdetails ul li').eq(activeNum).removeClass('active');
    $(this).addClass('active');
    $('.product-imgSmall img')[0].src = $(this).find('img')[0].src;
    activeNum = $(this).attr('data-num');
    $('.product-imgBig img')[0].src = $(this).find('img').attr('data-src');
})

//放大镜效果
$('.product-imgs').click(function (e) {
    if ($(this).hasClass('product-imgSmall')) {
        $('.product-imgBig').css('display', 'block');
        $('.product-imgSmall').css('display', 'none');
    }
    var ev = e || event;
    var toLeft = ev.clientX - offset($('.product-imgBig')[0]).left - $('.product-mask')[0].clientWidth / 2;
    var toTop = ev.clientY + document.documentElement.scrollTop - offset($('.product-imgBig')[0]).top - $('.product-mask')[0].clientWidth / 2;

    $('.product-imgBig').find('img').css('left', -toLeft + 'px');
    $('.product-imgBig').find('img').css('top', -toTop + 'px');

    $('.product-imgBig').on('mousemove', function (e) {  //product-imgBig
        var ev = e || event;
        var maskL = ev.clientX - offset(this).left - $('.product-mask')[0].clientWidth / 2;
        var maskT = ev.clientY + document.documentElement.scrollTop - offset(this).top - $('.product-mask')[0].clientWidth / 2;
        if (maskL <= 0) {//最小值
            maskL = 0;
        }
        if (maskL >= $(this)[0].clientWidth - $('.product-mask')[0].clientWidth) {// 最大值
            maskL = $(this)[0].clientWidth - $('.product-mask')[0].clientWidth;
        }
        if (maskT <= 0) {//最小值
            maskT = 0;
        }
        if (maskT >= $(this)[0].clientHeight - $('.product-mask')[0].clientHeight) {// 最大值
            maskT = $(this)[0].clientHeight - $('.product-mask')[0].clientHeight;
        }
        $('.product-mask').css('left', maskL + 'px');
        $('.product-mask').css('top', maskT + 'px');
        var scaleX = maskL / ($(this)[0].clientWidth - $('.product-mask')[0].clientWidth);
        var scaleY = maskT / ($(this)[0].clientHeight - $('.product-mask')[0].clientHeight);

        var imgL = scaleX * ($(this).find('img')[0].clientWidth - $(this)[0].clientWidth);
        var imgT = scaleY * ($(this).find('img')[0].clientHeight - $(this)[0].clientHeight);
        $(this).find('img').css('left', -imgL + 'px');
        $(this).find('img').css('top', -imgT + 'px');
    })
    $('.product-imgBig').on('mouseleave', function () {
        $('.product-imgBig').off('mousemove')
        $('.product-imgBig').css('display', 'none');
        $('.product-imgSmall').css('display', 'block');
    })
    if ($(this).hasClass('product-imgBig')) {
        $('.product-imgBig').off('mousemove')
        $('.product-imgBig').css('display', 'none');
        $('.product-imgSmall').css('display', 'block');
    }
})
// 获取距离body的距离
function offset(dom) {
    var l = 0;
    var t = 0;
    var bdl = dom.clientLeft;
    var bdt = dom.clientTop;
    while (dom) {
        l = l + dom.offsetLeft + dom.clientLeft;
        t = t + dom.offsetTop + dom.clientTop;
        dom = dom.offsetParent;
    }
    return {
        left: l - bdl,
        top: t - bdt
    };
}
// 星级评分
$(function() {
    $('.rating > span').on('click', function() {
        $(this).prevAll('span').removeClass('active');
        $(this).addClass('active').nextAll('span').addClass('active');
    })
})
//数量
var num = 1;
$('.addNum').click(function () {
    if (num <= 1) {
        return
    }
    $('.iptNum').val(--num)
})
$('.rediusNum').click(function () {
    if (num >= 5) {
        $('.alert_panel').addClass('alertBlock');
        return
    }
    $('.iptNum').val(++num)
})
//弹出框操作
$('.alert_panelOmit').click(function () {
    $('.alert_panel').removeClass('alertBlock');
})
$('.alert_panelAffirm').click(function () {
    $('.alert_panel').removeClass('alertBlock');
})

//商品详情
var pordTabNum = 0;
$('.pord-tab').on('click', 'ul li', function () {
    // console.log($(this));
    $(this).addClass('curtab');
    $('.pordcont').eq(pordTabNum).removeClass('detailActive')
    $('.pord-tab ul li').eq(pordTabNum).removeClass('curtab');
    pordTabNum = $(this).attr('data-num');
    $('.pordcont').eq(pordTabNum).addClass('detailActive')
})

$.ajax({   //请求数据
    url: 'data/goodList.json',
    type: 'get',
    cache: false,
    dataType: 'json',
    success: function (json) {
        var codeIndex = 0;
        var codeStr = location.search.replace('?code=', '');
        var resStr = codeStr.replace('?code=', '').replace(/#+$/, '');
        $.each(json, function (index, item) {      //判断地址栏code值
            if (item.code == resStr) {
                codeIndex = index;
            }
        })
        // 样式小图
        var result1 = `
        <div class="i-mark">
            <span>预售</span>
        </div>
        <img src="./images/yh-goodList/${json[codeIndex].imgurl[0]}.jpg" alt="">`
        $('.product-imgSmall').html(result1);
        // 样式大图
        var result2 = `
        <div class="i-mark">
            <span>预售</span>
        </div>
        <div class="product-mask"></div>
        <img src="./images/yh-goodList/${json[codeIndex].imgurl[5]}.jpg" alt="">`;
        $('.product-acive').html(result2);
        // 小图列表图
        var result3 = `                                   
        <ul class="clearfix">
            <li class="active" data-num="0">
                <img src="./images/yh-goodList/${json[codeIndex].imgurl[0]}.jpg" data-src="./images/yh-goodList/${json[codeIndex].imgurl[5]}.jpg" alt="">
            </li>
            <li data-num="1">
                <img src="./images/yh-goodList/${json[codeIndex].imgurl[1]}.jpg" data-src="./images/yh-goodList/${json[codeIndex].imgurl[6]}.jpg" alt="">
            </li>
            <li data-num="2">
                <img src="./images/yh-goodList/${json[codeIndex].imgurl[2]}.jpg" data-src="./images/yh-goodList/${json[codeIndex].imgurl[7]}.jpg" alt="">
            </li>
            <li data-num="3">
                <img src="./images/yh-goodList/${json[codeIndex].imgurl[3]}.jpg" data-src="./images/yh-goodList/${json[codeIndex].imgurl[8]}.jpg" alt="">
            </li>
            <li data-num="4">
                <img src="./images/yh-goodList/${json[codeIndex].imgurl[4]}.jpg" data-src="./images/yh-goodList/${json[codeIndex].imgurl[9]}.jpg" alt="">
            </li>
        </ul>`;

        $('.picdetails').html(result3);
        $('.prod-tit').html(json[codeIndex].title);
        $('.pord-price strong').html(json[codeIndex].price);
        $('.pord-btn').attr('code', json[codeIndex].code)
        if (json[codeIndex].pordcolor.length !== 0) {
            var result4 = '';
            $.each(json[codeIndex].pordcolor, function (index, item) {
                result4 += `
                <li class="current">
                    <div class="pord-selbox">${item}</div>
                </li>`
            })
            $('.pord-color ul').html(result4);
        } else {
            $('.pord-color').remove();
        }
        if (json[codeIndex].pordsellist.length !== 0) {
            var result5 = '';
            $.each(json[codeIndex].pordsellist, function (index, item) {
                result5 += `
                <li class="current">
                    <div class="pord-selbox">${item}</div>
                </li>`
            })
            $('.pord-sellist ul').html(result5);
        } else {
            $('.pord-sellist').remove();
        }
    }

});
$('.joincart-btn').on('click', function () {   //加入购物车
    if (!localStorage.getItem('user')) {
        $('.lkq-login').css('display', 'block')
        return;
    }
    if (localStorage.getItem('shop')) {
        var shopObj = JSON.parse(localStorage.getItem('shop'));
    } else {
        var shopObj = {};
    }
    if (shopObj.hasOwnProperty($('.pord-btn').attr('code'))) {
        $('.alert_panel').addClass('alertBlock');
        $('.alert_panel .alert_panelBottom p').html('您的购物车已有此商品,请不要重复添加!');
        return;
    }
    $('.popup').addClass('alertBlock');
    shopObj[$('.pord-btn').attr('code')] = $('.iptNum').val();
    var JSONObj = JSON.stringify(shopObj);
    localStorage.setItem('shop', JSONObj);
})

//购物车提醒框
$('.goonbuy').click(function () {
    $('.popup').removeClass('alertBlock');
    console.log(666);
})
$('.popup-close').click(function () {
    $('.popup').removeClass('alertBlock');
})

//收藏
$('.btn-collectes').click(function () {
    // console.log(666);
    if ($(this).hasClass('btn-collect')) {
        $('.btn-enshrine').css('display', 'block');
        $('.btn-collect').css('display', 'none');
    } else {
        $('.btn-enshrine').css('display', 'none');
        $('.btn-collect').css('display', 'block');
    }

})
//立即购买
$('.buy-btn').on('click', function () {
    if (!localStorage.getItem('user')) {
        $('.lkq-login').css('display', 'block')
        return;
    }
    var payObj = {}
    payObj[$('.pord-btn').attr('code')] = $('.iptNum').val();
    var JSONPayObj = JSON.stringify(payObj);
    localStorage.setItem('payment', JSONPayObj);
    location.href = './settleAccounts.html';

})
// 购物车连接
