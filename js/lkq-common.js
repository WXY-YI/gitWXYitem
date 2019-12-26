// 子菜单的事件
var oAll_lkq = document.querySelector('.lkq-all');
var oSubmenu_lkq = document.querySelector('.lkq-Submenu');
var oArrbot_lkq = document.querySelector('.lkq-arrbot');
var oTop0_lkq = document.querySelector('.lkq-top_0');

oAll_lkq.onmouseover = () => {
    display1();
};
oSubmenu_lkq.onmouseover = () => {
    display1();
};
oAll_lkq.onmouseout = () => {
    display2();
};
oSubmenu_lkq.onmouseout = () => {
    display2();
};
function display1() {
    oSubmenu_lkq.style.display = 'block';
    oArrbot_lkq.style.backgroundPosition = -66 + 'px ' + -2 + 'px';
};
function display2() {
    oSubmenu_lkq.style.display = 'none';
    oArrbot_lkq.style.backgroundPosition = -100 + 'px ' + -2 + 'px';
};

// 顶部悬浮
document.onscroll = () => {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动高度
    if (scrollTop >= 500) { // 滚动高度 > 头部内容高度
        oTop0_lkq.classList.add('lkq-top_fixed');
    } else {
        oTop0_lkq.className = 'lkq-top_0';
    }
};

// 登陆框
var oUnlogin_lkq = document.querySelector('.lkq-unlogin'); // 点击登陆
var oLogin_lkq = document.querySelector('.lkq-login'); // 登陆框
var oFrom_lkq = document.querySelector('.lkq-form'); // 登陆
var oRegister_lkq = document.querySelector('.lkq-register'); // 注册
var oBtn1_lkq = document.querySelector('.lkq-btn1'); // 切换登陆
var oBtn2_lkq = document.querySelector('.lkq-btn2'); // 切换注册
var oBtn3_lkq = document.querySelector('.lkq-btn3'); // 关闭登陆框

oUnlogin_lkq.onclick = () => {
    oLogin_lkq.style.display = 'block';
};
oBtn3_lkq.onclick = () => {
    oLogin_lkq.style.display = 'none';
};
oBtn1_lkq.onclick = () => {
    oFrom_lkq.style.display = 'block';
    oRegister_lkq.style.display = 'none';
};
oBtn2_lkq.onclick = () => {
    oFrom_lkq.style.display = 'none';
    oRegister_lkq.style.display = 'block';
};

// 登陆注册
var oCon1_lkq = document.querySelector('.lkq-con1'); // 接收返回数据
var oCon2_lkq = document.querySelector('.lkq-con2'); // 接收返回数据
var oUser1_lkq = document.querySelector('.lkq-user1'); // 登陆账号
var oPass1_lkq = document.querySelector('.lkq-pass1'); // 登陆密码
var oUser2_lkq = document.querySelector('.lkq-user2'); // 注册账号
var oPass2_lkq = document.querySelector('.lkq-pass2'); // 注册密码
var oLands_lkq = document.querySelector('.lkq-lands'); // 登陆按钮
var oReg_lkq = document.querySelector('.lkq-reg'); // 注册按钮
var oCheck_lkq = document.querySelector('.lkq-check'); // 记住密码
var oLand_lkq = document.querySelector('.lkq-Land'); // 登陆后的样式
var oName_lkq = document.querySelector('.lkq-name'); // 登陆后的昵称
var oList_lkq = document.querySelector('.lkq-list'); // 退出登陆

// 设置cookie
if (getCookie('user')) {
    oUser1_lkq.value = getCookie('user');
    oPass1_lkq.value = getCookie('pass');
    oCheck_lkq.checked = true;
}

// 判断登陆
oLands_lkq.onclick = () => {
    if (oUser1_lkq.value == '' && oPass1_lkq.value == '') {
        return;
    }
    var val = 'act=login&user=' + oUser1_lkq.value + '&pass=' + oPass1_lkq.value;
    ajax('get', './php/login2.php', val, function (data) {
        var json = JSON.parse(data);
        oCon1_lkq.innerHTML = json.msg;
        if (json.msg == '登陆成功') {
            oLogin_lkq.style.display = 'none';
            oLand_lkq.style.display = 'block';
            oUnlogin_lkq.style.display = 'none';
            oName_lkq.innerHTML = oUser1_lkq.value;
            var json_1 = JSON.stringify(oUser1_lkq.value);
            localStorage.setItem('user', json_1);

            var shopObj = JSON.parse(localStorage.getItem('shop'));
            $('.navico-cartnum').html(Object.keys(shopObj).length);
        } else {
            oLogin_lkq.style.display = 'block';
            oLand_lkq.style.display = 'none';
            oUnlogin_lkq.style.display = 'block';
        }
    }, function (status) {
        alert('请求失败');
    })
    // 判断是否记住密码
    if (oCheck_lkq.checked == true) {
        setCookie('user', oUser1_lkq.value, 7);
        setCookie('pass', oPass1_lkq.value, 7);
    } else {
        removeCookie('user');
        removeCookie('pass');
    }
}

// 判断登陆后记住显示用户名
if (localStorage.getItem('user')) {
    oLand_lkq.style.display = 'block';
    oUnlogin_lkq.style.display = 'none';
    var oMyuser = localStorage.getItem('user');
    oMyuser = JSON.parse(oMyuser);
    oName_lkq.innerHTML = oMyuser;
}

// 退出登陆
oList_lkq.onclick = () => {
    $('.navico-cartnum').html(0);

    localStorage.removeItem('user');
    oLand_lkq.style.display = 'none';
    oUnlogin_lkq.style.display = 'block';
}

// 注册
oReg_lkq.onclick = () => {
    if (oUser2_lkq.value == '' && oPass2_lkq.value == '') {
        return;
    }
    var val = 'act=add&user=' + oUser2_lkq.value + '&pass=' + oPass2_lkq.value;
    ajax('get', './php/login2.php', val, function (data) {
        var json = JSON.parse(data);
        oCon2_lkq.innerHTML = json.msg;
        console.log(json.msg);
        if (json.msg == '登陆成功') {
            oLogin_lkq.style.display = 'none';
        } else {
            oLogin_lkq.style.display = 'block';
        }
    }, function (status) {
        alert('请求失败');
    })
}

// 购物车
var oCart_lkq = document.querySelector('.lkq-cart-num');
if (localStorage.getItem('shop')) {
    var Obj = JSON.parse(localStorage.getItem('shop'));
    oCart_lkq.innerHTML = (Object.keys(Obj).length);
}
