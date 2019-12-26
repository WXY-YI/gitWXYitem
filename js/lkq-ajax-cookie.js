
// ajax
function ajax(type, url, data, success, failed) {
    // 1.创建XMLHttpRequest对象(数据交互对象)
    if (window.XMLHttpRequest) {
        var oXhr = new XMLHttpRequest();
    } else {
        var oXhr = ActiveXObject('Microsoft.XMLHTTP');//ie 5 6
    }
    // data -> 'a=123&b=456'
    if (type == 'get' || type == 'GET') {
        // 2. 打开与服务器的连接
        oXhr.open(type, url + '?' + data + '&_=' + new Date().getTime(), true); // 解决缓存
        // 3. 发送请求
        oXhr.send(null); // get请求
    } else if (type == 'post' || type == 'POST') {
        // 2. 打开与服务器的连接
        oXhr.open(type, url, true);
        // 模拟表单form的post方式提交数据，在send之前设置
        oXhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // 3. 发送请求
        oXhr.send(data);
    } else {
        alert('目前支支持get和post请求方式!');
    }

    // 4. 等待服务器的响应
    oXhr.onreadystatechange = function () {
        if (oXhr.readyState == 4) {// 请求完成
            if (oXhr.status == 200) { // 请求成功
                success(oXhr.responseText);
            } else { // 请求失败
                failed(oXhr.status);
            }
        }
    }
}


// 设置cookie
function setCookie(key, val, day) {
    if (day) {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + escape(val) + ';expires = ' + date;
    } else {
        document.cookie = key + '=' + escape(val);
    }
}

// 获取cookie
function getCookie(key) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        if (arr2[0] == key) {
            return unescape(arr2[1]);
        }
    }
    return null;
}

// 删除cookie
function removeCookie(key) {
    setCookie(key, '666', -3);
}
