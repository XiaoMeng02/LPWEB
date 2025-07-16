// 如何实现登陆效果
// 1.收集表单，然后通过ajax向后端请求
// 2.请求完成后，通过对比，得到登陆结果
// 3.登陆失败，弹窗提示
// 4.登陆成功，调整页面

// 获取登陆按钮
let loginBtn = document.querySelector(".right-panel button");
// 触发登陆事件
loginBtn.addEventListener("click", () => {
	let formObj = {}
	// 获取登陆表单
	let loginInput = document.querySelectorAll(".loginForm");
	for (let i = 0; i < loginInput.length; i++) {
		// 验证表单是否为空
		if (loginInput[i].value == "") {
			alert("账户密码不允许为空");
			// 这种情况会直接退出函数
			// 当需要直接退出函数的时候，我们会直接return返回
			return false;
		}

		// 使用获取到的键和值，保存到对象中
		// 错误写法 formObj.username = loginInput[i].name;
		formObj[loginInput[i].name] = loginInput[i].value;
	}

	// 将获取到的数据向后端提交
	axios({
		url: "http://localhost:3000/users",
		method: "get",
		params: formObj
	}).then((result) => {
		//请求成功，检查是否有这个账户密码存在
		// 如果没有就提示登陆失败，请检查账户密码是否正确
		// 如果登陆成功，则跳转页面
		if (result.data.length > 0) {
			alert("登陆成功")
		} else {
			alert("登陆失败")
		}
	}).catch((error) => {
		alert("登陆失败，检查网络")
		console.log(error);
	})
});


// 完成注册页面，将注册页面嵌入到登陆页面中
// 当a标签被点击的时候，切换显示登陆还是注册页面
let registerFrame = document.querySelector(".registerFrame");
let loginFrame = document.querySelector(".loginFrame");
let aLogin = document.querySelector(".loginFrame a");
let aRegister = document.querySelector(".registerFrame a");

aLogin.addEventListener("click", (event) => {
	// 阻止默认事件
	event.preventDefault();

	//隐藏登陆页面，显示注册页面
	registerFrame.className = "registerFrame show";
	loginFrame.className = "loginFrame";
});

aRegister.addEventListener("click", (event) => {
	// 阻止默认事件
	event.preventDefault();
	//隐藏注册页面，显示登陆页面
	registerFrame.className = "registerFrame";
	loginFrame.className = "loginFrame show";
});

// 这里通过这样的方式，实现了类似于单页面的效果
// 比如这个例子中，网站一般都是切换组件，而非页面


// 实现注册逻辑，实现购物车页面，实现购物车逻辑