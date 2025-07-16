// 登录表单提交事件
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = this.querySelector('[name=username]').value;
    const password = this.querySelector('[name=password]').value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'users.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const users = JSON.parse(xhr.responseText).users;
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          alert('登录成功！');
          // 这里可以添加跳转到主页的逻辑
        } else {
          alert('用户名或密码错误！');
        }
      }
    };
    xhr.send();
  });
}

// 注册表单提交事件
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = this.querySelector('[name=username]').value;
    const phone = this.querySelector('[name=phone]').value;
    const password = this.querySelector('[name=password]').value;
    const confirm = this.querySelector('[name=confirm]').value;

    if (password !== confirm) {
      alert('两次密码输入不一致！');
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'users.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const users = data.users;
        const isUsernameExists = users.some(u => u.username === username);
        if (isUsernameExists) {
          alert('用户名已存在！');
          return;
        }

        const newUser = {
          id: users.length + 1,
          username: username,
          password: password,
          age: null,
          gender: null,
          address: null,
          phone: phone,
          email: null
        };
        users.push(newUser);

        // 这里可以添加将新用户数据保存到服务器的逻辑
        alert('注册成功！');
        // 这里可以添加跳转到登录页面的逻辑
      }
    };
    xhr.send();
  });
}