
$('.addition').click(function () {    //显示修改地址框
    $('.shippingAddress').addClass('shippingState');
    regionState = 'null';
})
$('.shippingAddress-omit').click(function () {  //隐藏修改地址框
    $('.shipAddress-hint').html('');
    $('.form-iptShjr').val('');
    $('.form-iptDz').val('');
    $('.form-iptSj').val('');
    $('.form-iptYb').val('');

    $('.shippingAddress').removeClass('shippingState');
})
var seleNum;
$(document).click(function (e) {     //显示地址下拉框
    if ($(e.target).hasClass('selected')) {
        if (seleNum) {
            $('.district' + seleNum).removeClass('shippingState');
        }
        $('.district' + $(e.target).attr('data-num')).addClass('shippingState');
        seleNum = $(e.target).attr('data-num');
    } else {
        $('.district' + seleNum).removeClass('shippingState');
    }
})
$('.district').on('click', 'ul li', function () {
    var dataNum = $(this).closest('.district').attr('data-num');
    var selecteds = document.querySelector('.selected' + dataNum);
    selecteds.innerHTML = $(this).html();
})

function tacitlyFn() {
    var tacitly = 0;
    return function () {
        return tacitly;
    }
}
function regionAdd() {    //显示地址
    if (!localStorage.getItem('location')) {
        return
    }
    var regionArr = JSON.parse(localStorage.getItem('location'));
    var myRegion = '';

    var myDefaultSite = JSON.parse(localStorage.getItem('defaultSite'));
    if (!myDefaultSite) {
        myDefaultSite = 0;
    }
    $.each(regionArr, function (index, item) {
        myRegion += `<li class="addressid"  add-num="${index}">
        <span class="address-aler ${index == myDefaultSite ? 'address-tacitlyApprove">默认地址' : 'address-default">设为默认'}</span>
        <span class="address-user">${regionArr[index].user}</span>
        <p class="address-site">${regionArr[index].site}</p>
        <p class="address-postcode">${regionArr[index].postcode}</p>
        <p class="address-phone">${regionArr[index].phone}</p>
        <div class="address-tool"><span class="addressAlter"></span><span class="addressOmit"></span></div>
    </li>`
    })
    $('.addition').before(myRegion);
}
regionAdd()

var regionState;
$('.address').on('click', '.addressAlter', function () {  //修改地址
    $('.shippingAddress').addClass('shippingState');
    var myJsonArr = JSON.parse(localStorage.getItem('location'));
    var myIndex = $(this).closest('.addressid').attr('add-num');

    $('.form-iptShjr').val(myJsonArr[myIndex]['user']);
    $('.form-iptDz').val(myJsonArr[myIndex]['site']);
    $('.form-iptSj').val(myJsonArr[myIndex]['phone']);
    $('.form-iptYb').val(myJsonArr[myIndex]['postcode']);
    regionState = myIndex;
})

$('.region').on('click', function () {
    shipAddressHint = '';
    regionChock($('.form-iptShjr'), /^[\w\u4e00-\u9fa5]{3,20}$/, $('.shipAddress-hint'), '收件人为必填项, 且最多20个字符|');
    regionChock($('.form-iptDz'), /^[\s\S]{1,100}$/, $('.shipAddress-hint'), '收件人地址为必填项, 且最多100个字符|');
    regionChock($('.form-iptSj'), /^1\d{10}$/, $('.shipAddress-hint'), '手机号码为必填项, 且只能输入11位数字')
    if (shipAddressHint != '') {
        return
    } else {
        $('.shipAddress-hint').html('');
    }

    if (!isNaN(regionState)) {    //修改地址
        var MuressId = $('.addressid').eq(regionState);
        MuressId.find('.address-user').html($('.form-iptShjr').val());
        MuressId.find('.address-site').html($('.form-iptDz').val());
        MuressId.find('.address-postcode').html($('.form-iptYb').val());
        MuressId.find('.address-phone').html($('.form-iptSj').val());

        var myJsonArr = JSON.parse(localStorage.getItem('location'));
        var meJsonObj = {
            'user': $('.form-iptShjr').val(),
            'site': $('.form-iptDz').val(),
            'postcode': $('.form-iptSj').val(),
            'phone': $('.form-iptYb').val()
        }

        myJsonArr.splice(regionState, 1, meJsonObj);
        myJsonArr = JSON.stringify(myJsonArr);
        localStorage.setItem('location', myJsonArr);

    } else {           //添加地址
        if (localStorage.getItem('location')) {
            regionArr = JSON.parse(localStorage.getItem('location'));
        } else {
            var regionArr = [];
        }

        var regionObj = {
            user: $('.form-iptShjr').val(),
            site: $('.form-iptDz').val(),
            postcode: $('.form-iptYb').val(),
            phone: $('.form-iptSj').val()
        }

        regionArr.push(regionObj)
        regionArr = JSON.stringify(regionArr);
        localStorage.setItem('location', regionArr);

        var addressTacitly = 'address-default';
        if ($('.addressid').length == 0) {
            addressTacitly = 'address-tacitlyApprove';
            $('.purchas-user').html(regionObj.user);
            $('.purchas-phone').html(regionObj.phone);
            $('.purchas-site').html(regionObj.site);
        }
        var myRegion = `<li class="addressid" add-num="${$('.addressid').length}">
                <span class="address-aler ${addressTacitly}">默认地址</span>
                <span class="address-user">${$('.form-iptShjr').val()}</span>
                <p class="address-site">${$('.form-iptDz').val()}</p>
                <p class="address-postcode">${$('.form-iptYb').val()}</p>
                <p class="address-phone">${$('.form-iptSj').val()}</p>
                <div class="address-tool"><span class="addressAlter"></span><span class="addressOmit"></span></div>
        </li>`
        $('.addition').before(myRegion);

    }
})

var shipAddressHint = '';
function regionChock(input, reg, span, inner) {

    var value = input.val();
    var res = reg.test(value);

    if (!res) {
        shipAddressHint += inner;
        span.html(shipAddressHint);
    }
}


$('.address').on('click', '.addressOmit', function () {   //删除地址
    if($(this).closest('.addressid').find('.address-aler').hasClass('address-tacitlyApprove')){
        $('.alert_panel').addClass('alertBlock')
        $('.alert_panel').find('.alert_panelBottom p').html('无法删除默认地址');
        return
    }
    $(this).closest('.addressid').remove();

    var JSONArr = JSON.parse(localStorage.getItem('location'));
    var myItem = $(this).closest('.addressid').attr('add-num');
    JSONArr.splice(myItem, 1);
    var regionArr = JSON.stringify(JSONArr);
    localStorage.setItem('location', regionArr);

    var addressidNum = 0;
    $.each($('.addressid'), function (index, item) {  //更新 addressi的 add-num属性值
        $(item).attr('add-num', addressidNum++);
    })
})


$('.address').on('click', '.address-default', function () {  //设置默认地址
    var myDefaultSite = JSON.parse(localStorage.getItem('defaultSite'));
    var myDefault = myDefaultSite;

    $(this).removeClass('address-default');
    $(this).addClass('address-tacitlyApprove');
    $(this).html('默认地址');

    $('.addressid').eq(myDefault).find('.address-tacitlyApprove').addClass('address-default');
    $('.addressid').eq(myDefault).find('.address-tacitlyApprove').html('设为默认');
    $('.addressid').eq(myDefault).find('.address-tacitlyApprove').removeClass('address-tacitlyApprove');

    myDefault = $(this).closest('.addressid').attr('add-num');

    var strDefault = JSON.stringify(myDefault);
    localStorage.setItem('defaultSite', strDefault);

    myPurchas()
})

var purchasNum = 0;
var purchasPrice = 0;
$.ajax({   //请求数据
    url: 'data/merge.json',
    type: 'get',
    cache: false,
    dataType: 'json',
    success: function (json) {
        var JsonList = JSON.parse(localStorage.getItem('payment'));
        var result = '';
        $.each(Object.keys(JsonList), function (index, val) {
            $.each(json, function (index, item) {
                if (item.code === val) {
                    result += ` <li class="clearfix" code="${item.code}">
                    <div class="shoppingImg">
                        <a href="#"><img src="${item.imgurl}" alt=""></a>
                    </div>
                    <div class="shoppingTitle">
                        <a href="#">
                            <p>${item.title}</p>
                        </a>
                    </div>
                    <p>${item.intro}</p>
                    <div class="shoppingPrice">
                        <p>${item.price} 元</p>
                    </div>
                    <div class="amountBtn">
                        <span>${JsonList[item.code]}</span>
                    </div>
                    <div class="shoppingTotaPrices">
                        <strong>${item.price * JsonList[item.code]} 元</strong>
                    </div>
                </li>`;
                    purchasNum += parseInt(JsonList[item.code]);
                    purchasPrice += parseFloat(item.price * JsonList[item.code]);
                }
            })
        })
        $('.myCart-list').html(result);
        $('.purchas-quantity').html(purchasNum);
        $('.purchas-price').html(purchasPrice + '.00');
        $('.purchas-outOfPocket').html(purchasPrice + '.00 元');
        myPurchas()
    }
});

function myPurchas() {
    $.each($('.addressid'), function (index, item) {
        if ($(item).find('.address-aler').hasClass('address-tacitlyApprove')) {
            var resUser = $('.address-user').eq(index).html();
            var resSite = $('.address-site').eq(index).html();
            var resPhone = $('.address-phone').eq(index).html();

            $('.purchas-user').html(resUser);
            $('.purchas-phone').html(resPhone);
            $('.purchas-site').html(resSite);
        }
    });
}

$('.refer-btn').click(function () {    //判断是否有收货地址
    console.log($('.addressid').length);
    if ($('.addressid').length) {
        location.href = './annotation.html';
    } else {
        $('.alert_panel').addClass('alertBlock');
        $('.alert_panel').find('.alert_panelBottom p').html('请先选择你的收货地址~');
    }
})
$('.alert_panelOmit').click(function () {
    $('.alert_panel').removeClass('alertBlock');
})
$('.alert_panelAffirm').click(function () {
    $('.alert_panel').removeClass('alertBlock');
})