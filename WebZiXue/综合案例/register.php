<?php
// 模拟注册逻辑
$username = $_POST['username'];
$phone = $_POST['phone'];
$code = $_POST['code'];
$password = $_POST['password'];

// 简单验证，实际开发中需要插入数据库
if ($username && $phone && $code && $password) {
    $response = array(
        'success' => true,
        'message' => '注册成功'
    );
} else {
    $response = array(
        'success' => false,
        'message' => '注册失败，请检查输入'
    );
}

header('Content-Type: application/json');
echo json_encode($response);
?>