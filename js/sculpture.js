var curNuma = 1;
$.each($('.djClassUl dd'), function (index, item) {
    $(item).click(function () {
        if ($(item).hasClass('cur')) {
            return
        }
        $(item).addClass('cur');
        $('.djClassUl dd').eq(curNuma).removeClass('cur');
        curNuma = index;
    })
})

var curNumb = 0;
$.each($('.sortdl dd'), function (index, item) {
    $(item).click(function (e) {
        e.preventDefault = true;
        if ($(item).find('i').hasClass('i-arrbbot')) { 
            $(item).find('i').addClass('i-arrbtop');
            $(item).find('i').removeClass('i-arrbbot');
        } else {
            $(item).find('i').addClass('i-arrbbot');
            $(item).find('i').removeClass('i-arrbtop');
        }

        if ($(item).hasClass('cur')) {   //有cur名的话无法改变dd颜色
            return
        }
        $(item).addClass('cur');
        $('.sortdl dd').eq(curNumb).removeClass('cur');
        $('.sortdl dd').eq(curNumb).find('i').removeClass('i-arrbtop');
        $('.sortdl dd').eq(curNumb).find('i').removeClass('i-arrbbot');
        curNumb = index;
    })
})

function getAjax(state) {
    $.ajax({
        url: 'data/sculpture.json',
        type: 'get',
        cache: false,
        dataType: 'json',
        success: function (json) {
            var result = '';
            var myJson = json;   //保存值
            var res;
            if (state == 'priceT') {
                res = json.sort(function (a, b) {
                    return b.price - a.price; //价格降序
                })
            } else if (state == 'priceB') {
                res = json.sort(function (a, b) {
                    return a.price - b.price;//价格升序
                })
            } else if (state == 'salesB') {
                for (var i = 0, len = json.length; i < len; i++) {
                    if (json[i].hasOwnProperty('message')) {
                        var arr = myJson.splice(i, 1);
                        myJson.unshift(arr[0])
                    }
                }
                res = myJson;
            } else if (state == 'salesT') {
                for (var i = 0, len = json.length; i < len; i++) {
                    if (!json[i].hasOwnProperty('message')) {
                        var arr = myJson.splice(i, 1);
                        myJson.unshift(arr[0])
                    }
                }
                res = myJson;
            } else {
                res = myJson;  //默认
            }

            $.each(res, function (index, item) {
                result += `<li code="${item.code}">
                            ${item.message ? `<div class="i-mark"><span class="mark-txt">${item.message}</span></div>` : ''}
                            <a href="./goodList.html?code=${item.code}"  target="block" class="good-link">
                                <img src="${item.imgurl}" alt="">
                                <div class="good-info">
                                    <p>${item.title}</p>
                                    <span>￥${item.price}</span>
                                </div>
                            </a>
                        </li>`;
            })
            $('.good-listUl').html(result);
        }
    });
}
getAjax()

$('.sortdl dd').eq(0).click(function () {
    getAjax();
})
$('.sortdl dd').eq(1).click(function () {
    if ($(this).find('i').hasClass('i-arrbbot')) {
        getAjax('priceT');
    } else {
        getAjax('priceB');
    }
})
$('.sortdl dd').eq(2).click(function () {
    if ($(this).find('i').hasClass('i-arrbbot')) {
        getAjax('salesB');
    } else {
        getAjax('salesT');
    }
})
if (localStorage.getItem('shop')) {
    var jsonObj = JSON.parse(localStorage.getItem('shop'));
    $('.navico-cartnum').html(Object.keys(jsonObj).length);
}
$(document).scroll(function (e) {
    var toTop = $(document).scrollTop();
    if (toTop >= 400) {
        $('.topnav').addClass('topnavtitle');
    } else {
        $('.topnav').removeClass('topnavtitle');
    }
})
if (!localStorage.getItem('user')) {
    $('.fixedenav .mycart .navico-cartnum').html('0')
}
$('.topnav').click(function () {
    $(document).scrollTop(0);
})

$('.fixedenav .mycart').click(function () {
    if (!localStorage.getItem('user')) {
        $('.lkq-login').css('display', 'block')
        return;
    }
    open('./shopCart.html');
})