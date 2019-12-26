<?php
// 响应头防止乱码
header("Content-type:text/html;charset=utf8");

$user = $_GET['user'];
$sex = $_GET['sex'];
$age = $_GET['age'];
$todo = $_GET['todo'];

// 连接数据库
$link = mysqli_connect('','root','','sz1914');

// 判断是否连接成功
if(mysqli_connect_error($link)){
    echo '数据库连接失败：'.mysqli_connect_error();
    die();
} else{
    echo 'OK-数据库连接成功！';
}

// 设置字符编码
mysqli_set_charset($link,'utf8');

if($todo == '添加'){
    // 要执行的sql语句
    $sql = "insert into user set name='{$user}',sex='{$sex}',age='{$age}'";

    // 执行sql语句之后，返回结果集(资源类型resource)
    $results = mysqli_query($link,$sql);

    $row = mysqli_affected_rows($link);//返回上条sql语句执行后受影响条数
    if($row > 0){
        echo '数据添加成功！';
    } else{
        echo '数据添加失败！';
    }
}

die();

mysqli_close($link); // 关闭数据库连接


?>