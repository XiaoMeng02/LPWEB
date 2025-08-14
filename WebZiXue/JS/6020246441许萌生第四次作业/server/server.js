const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// 解析JSON请求体
app.use(bodyParser.json());

// 模拟用户数据库
const users = [];

// 注册接口
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // 检查用户名是否已存在
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.json({ success: false, message: '用户名已存在' });
  }
  
  // 保存用户（注意：实际应用中应加密密码）
  users.push({ username, password });
  
  res.json({ success: true, message: '注册成功' });
});

// 登录接口
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // 查找用户
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    res.json({ success: true, message: '登录成功' });
  } else {
    res.json({ success: false, message: '用户名或密码错误' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
