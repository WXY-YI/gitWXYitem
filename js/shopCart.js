if (localStorage.getItem('shop')) {
    var codeObj = JSON.parse(localStorage.getItem('shop'));
    if (Object.keys(codeObj).length > 0) {
        $.ajax({
            url: 'data/merge.json',
            type: 'get',
            cache: false,
            dataType: 'json',
            success: function (json) {
                var result = '';

                $.each(Object.keys(codeObj), function (index, val) {
                    $.each(json, function (index, item) {
                        if (item.code === val) {

                            var regurl = '###';
                            if (item.code.match(/^Y/)) {
                                regurl = './goodList.html';
                            }
                            if (item.code.match(/^lkq/)) {
                                regurl = './lkq-details.html';
                            }
                            if(item.code.match(/^hth/)){
                                regurl = './hth-goodsmsg.html';
                            }
                            if(item.code.match(/^w/)){
                                regurl = './windex2.html';
                            }

                            result += `<li class="clearfix" code="${item.code}">
                            <span class="check tobtn"></span>
                            <div class="shoppingImg">
                                <a href="${regurl}?code=${item.code}"><img src="${item.imgurl}" alt=""></a>
                            </div>
                            <div class="shoppingTitle">
                                <a href="${regurl}?code=${item.code}">
                                    <p>${item.title}</p>
                                </a><br>
                                <!-- <strong>vip立减</strong><br> -->
                                <span>${item.present}</span>
                            </div>
                            <p>${item.intro}</p>
                            <div class="shoppingPrice">
                                <span>${item.price} 元</span>
                                <p>${item.price} 元</p>
                            </div>
                            <div class="amountBtn"><span class="reduce">-</span><input type="text" class="ipt" value="${codeObj[item.code]}"><span class="add">+</span>
                            </div>
                            <div class="shoppingTotaPrices">
                                <strong>${item.price * codeObj[item.code]}.00 元</strong>
                            </div>
                            <div class="shoppingOperate">
                                <span class="omit">删除</span><br>
                                <span class="collect">移入收藏夹</span>
                            </div>
                        </li>`;
                        }
                    })
                })
                $('.myCart-list').html(result);
            }
        });

        $('.myCart-list').on('click', 'li .shoppingTitle a', function () {
            if ($(this).closest('li').attr('code').match(/^Y|lkq/)) {
                return;
            }
            var tiao = $(this).closest('li').attr('code');
            var jso = JSON.stringify({ "tz2": tiao });
            localStorage.setItem('tz', jso);
            location.href = './zxg-index2.html';
        });

        $('.myCart-list').on('click', '.check', function () {          // 单选全选
            $(this).toggleClass('state');
            var myArr = [];
            $('.check').each(function (index, item) {
                if ($(item).hasClass('state')) {
                    myArr.push('a');
                } else {
                    myArr.push('b');
                }
            })
            if (myArr.indexOf('b') == -1) {
                $('.ckb').addClass('state');
            } else {
                $('.ckb').removeClass('state');
            }

            state($);
        })
        $('.ckb').click(function () {           // 单选全选
            $(this).toggleClass('state');
            if ($(this).hasClass('state')) {
                $('.check').addClass('state');
            } else {
                $('.check').removeClass('state');
            }
            state($);
        })
        $('.myCart-list').on('click', 'li .omit', function () {    //删除
            var code = $(this).closest('li').attr('code');
            $.each(Object.keys(codeObj), function (index, val) {
                if (val === code) {
                    delete codeObj[code];
                }
            })

            var jsonObj = JSON.stringify(codeObj);
            localStorage.setItem('shop', jsonObj);

            $(this).closest('li').remove();

            if (Object.keys(codeObj).length <= 0) {
                $('.myCart').html('<div class="myCart-empty"><em class="myCart-titleCart">购物车空空如也，赶紧选购我们的商品吧！ <a href="./lkq-homepage.html" title="【去逛逛】" class="myCart-stroll">【去逛逛】</a></em></div>');
            }

            if ($(this).attr('state')) {
                $('.check').css('background', '#ad8c3c url(../images/ico-cart.png) no-repeat 4px 2px');
                $('.check').attr('state', true);
            } else {
                $('.check').css('background', '');
                $('.check').attr('state', '');
            }
        })
        $('.myCart-list').on('click', 'li .add', function () {
            $(this).siblings('.reduce').css('pointer-events', '');
            var num = $(this).siblings('.ipt').val();
            $(this).siblings('.ipt').val(++num);
            var code = $(this).closest('li').attr('code');
            if (localStorage.getItem('shop')) {
                var numObj = JSON.parse(localStorage.getItem('shop'));
            } else {
                var numObj = {};
            }
            numObj[code] = num;
            numObj = JSON.stringify(numObj);
            localStorage.setItem('shop', numObj);

            var totaPrices = $(this).closest('li').find('.shoppingTotaPrices strong');
            var oPrices = $(this).closest('li').find('.shoppingPrice p');
            totaPrices.text(parseInt(oPrices.text()) * num + ' 元');

            state($);
        })
        $('.mycart-clearing').click(function () {  //结算商品

            var checkState;
            $.each($('.check'), function (index, item) {
                if ($(item).hasClass('state')) {
                    checkState = true;
                }
            })
            if (!checkState) {
                $('.alert_panel').addClass('alertBlock');
                return;
            }

            var regionObj = {};
            $.each($('.check'), function (index, item) {
                if ($(item).hasClass('state')) {
                    var theCode = $(item).parent().attr('code');
                    var theNum = $(item).siblings('.amountBtn').find('.ipt').val();
                    regionObj[theCode] = theNum;
                }
            })

            var strRegionObj = JSON.stringify(regionObj);
            localStorage.setItem('payment', strRegionObj);
            open('./settleAccounts.html');
        })
        $('.alert_panelOmit').click(function () {
            $('.alert_panel').removeClass('alertBlock');
        })
        $('.alert_panelAffirm').click(function () {
            $('.alert_panel').removeClass('alertBlock');
        })
        $('.myCart-list').on('click', 'li .reduce', function () {
            var num = $(this).siblings('.ipt').val();
            if (num <= 1) {
                $(this).css('pointer-events', 'none');
            } else {
                $(this).siblings('.ipt').val(--num);
            }
            var code = $(this).closest('li').attr('code');
            if (localStorage.getItem('shop')) {
                var numObj = JSON.parse(localStorage.getItem('shop'));
            } else {
                var numObj = {};
            }
            numObj[code] = num;
            numObj = JSON.stringify(numObj);
            localStorage.setItem('shop', numObj);

            var totaPrices = $(this).closest('li').find('.shoppingTotaPrices strong');
            var oPrices = $(this).closest('li').find('.shoppingPrice p');
            totaPrices.text(parseInt(oPrices.text()) * num + ' 元');

            state($);
        })
        function state($) {
            var totaPrices = 0;
            var totaNum = 0;
            $('.check').each(function (index, item) {
                if ($(item).hasClass('state')) {
                    totaPrices += parseInt($(item).closest('li').find('.shoppingTotaPrices strong').html());
                    totaNum += parseInt($(item).closest('li').find('.amountBtn .ipt').val());
                }
            })
            $('.myCart-allPrice').html(totaPrices + '.00 元');
            $('.myCart-choice').html(totaNum);

        }
    } else {
        $('.myCart').html('<div class="myCart-empty"><em class="myCart-titleCart">购物车空空如也，赶紧选购我们的商品吧！ <a href="./lkq-homepage.html" title="【去逛逛】" class="myCart-stroll">【去逛逛】</a></em></div>');
    }
} else {
    $('.myCart').html('<div class="myCart-empty"><em class="myCart-titleCart">购物车空空如也，赶紧选购我们的商品吧！ <a href="./lkq-homepage.html" title="【去逛逛】" class="myCart-stroll">【去逛逛】</a></em></div>');
}

