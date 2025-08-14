<?php
// 模拟验证逻辑
$username = $_POST['username'];
$password = $_POST['password'];

// 读取用户数据
$usersData = file_get_contents('users.json');
$users = json_decode($usersData, true)['users'];

$isValid = false;
foreach ($users as $user) {
    if ($user['username'] === $username && $user['password'] === $password) {
        $isValid = true;
        break;
    }
}

if ($isValid) {
    $response = array(
        'success' => true,
        'message' => '登录成功'
    );
} else {
    $response = array(
        'success' => false,
        'message' => '用户名或密码错误'
    );
}

header('Content-Type: application/json');
echo json_encode($response);
?>