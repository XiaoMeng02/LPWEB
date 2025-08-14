// 如何实现登陆效果
// 1.收集表单，然后通过ajax向后端请求
// 2.请求完成后，通过对比，得到登陆结果
// 3.登陆失败，弹窗提示
// 4.登陆成功，调整页面


// axios的全局配置属性
// 配置默认的url路径
// 使用这样的方法，设置全局路径之后，后面会默认使用这个路径作为url的前缀
// 后面的/users叫做路由 路由的作用是告诉服务器，我们需要处理什么样的请求
axios.defaults.baseURL = "http://localhost:3000";

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
		url: "/users",
		method: "get",
		params: formObj
	}).then((result) => {
		//请求成功，检查是否有这个账户密码存在
		// 如果没有就提示登陆失败，请检查账户密码是否正确
		// 如果登陆成功，则跳转页面
		if (result.data.length > 0) {
			alert("登陆成功")
			// 获取用户名
			let username = formObj.username;
			// 跳转功能页面并携带参数
			window.location = `http://127.0.0.1:8848/前端实训/作业/购物车完整版/main.html?username=${username}`;
		} else {
			alert("登陆失败")
		}
	}).catch((error) => {
		alert("登陆失败，检查网络")
		console.log(error);
	})
});


// 实现注册逻辑
// 1 先使用工具测试接口
// 2 在前端实现接口
let registerBtn = document.querySelector(".registerFrame button");
// 点击以后，请求注册接口
registerBtn.addEventListener("click", () => {
	// 如何获取传递的值
	let registerInput = document.querySelectorAll(".registerForm");
	let registerObj = {};
	// 缺少数据类型验证的方法
	// 缺少注册逻辑，不能重复注册，这个如何实现？
	// 在注册之前，先从后端对比账户信息，如果已有账户，提示用户重复注册
	// 如果没有，则允许注册
	// 这个防止重复注册的代码，一般是在服务器上进行


	// 将键值对，放到对象中
	for (let i = 0; i < registerInput.length; i++) {
		// 验证表单是否为空
		if (registerInput[i].value == "") {
			alert("注册信息都为必填项");
			return false;
		}

		registerObj[registerInput[i].name] = registerInput[i].value;
	}

	// 异步的链式调用
	axios({
		url: "/users",
		method: "get",
		params: {
			username: registerObj.username,
		}
	}).then((result) => {
		// 第一个异步请求，检查账户信息是否已经存在
		// 根据这一次请求的结果，来决定下一次的请求
		if (result.data.length == 0) {
			console.log("该账户信息不存在，可以注册");
			// 如果可以注册，那么使用return返回promise类型的post请求
			return axios.post("/users", registerObj);
		} else {
			alert("该账户已被注册，请换一个账户注册");
			return false;
		}
	}).then((result) => {
		console.log(result);
		if (result) {
			alert("注册成功");
			// 跳转功能页面
			window.location =
				"http://127.0.0.1:8848/%E5%89%8D%E7%AB%AF%E5%AE%9E%E8%AE%AD/%E4%BD%9C%E4%B8%9A/%E8%B4%AD%E7%89%A9%E8%BD%A6%E5%AE%8C%E6%95%B4%E7%89%88/main.html";
		}
	}).catch((error) => {
		alert("请求失败，请检查网络" + error);
	});

	// 测试分为黑盒测试和白盒测试，要将所有的情况考虑到去测试

	// 获取完用户的请求数据以后，验证该账户是否已经存在
	// 验证数据是否存在，就是把登陆的部分修改一下
	// axios({
	// 	url: "/users",
	// 	method: "get",
	// 	params: {
	// 		// 检查账户信息是否已经存在
	// 		username: registerObj.username,
	// 	}
	// }).then((result) => {
	// 	if (result.data.length == 0) {
	// 		console.log("该账户信息不存在，可以注册");
	// 	} else {
	// 		alert("该账户已被注册，请换一个账户注册");
	// 	}
	// }).catch((error) => {
	// 	alert("对比失败，请检查网络" + error)
	// })
	// 传递数据的时候前后端数据格式一定要对齐
	// 数据在传递过程中，一般看两眼，前端传递前看一眼，传递到后端后再看一眼
	// 只要能够保证数据的对齐，前后交互一般没有问题
	// console.log(registerObj);
	// ajax的post请求
	// axios.post("/users", registerObj).then((result) => {
	// 	// 如果注册成功
	// 	console.log(result);
	// 	alert("注册成功");
	// 	// 注册成功后一般有两种处理方式
	// 	// 1 直接跳转到功能页面
	// 	// 2 回到登陆页面，让用户使用刚注册的账户登陆
	// }).catch((error) => {
	// 	alert("注册失败，请检查网络" + error);
	// });
	// 要保证异步代码的执行顺序
	// Promise.all(axios({
	// 	url: "/users",
	// 	method: "get",
	// 	params: {
	// 		// 检查账户信息是否已经存在
	// 		username: registerObj.username,
	// 	}
	// }),axios.post("/users", registerObj));
	// Promise.allSettled();

})


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
// 网页的加载行为会尽量少的发生