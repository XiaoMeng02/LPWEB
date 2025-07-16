<?php
// 模拟验证逻辑
$username = $_POST['username'];
$password = $_POST['password'];

// 简单验证，实际开发中需要查询数据库
if ($username === 'test' && $password === '123456') {
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