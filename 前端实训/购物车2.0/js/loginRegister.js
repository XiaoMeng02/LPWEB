// 使用伪代码的形式,梳理我们需要什么样的功能
// 1.实现登陆注册页面的切换
// 2.实现登陆功能
// 登陆时,使用验证码验证
// 3.实现注册功能
// 实现重名账户的实时验证

//添加注册的验证
// 使用正则表达式添加验证表单效果
// 1-要求密码的长度要为6~10之间,要由大小写字符[A-z]，数字[0-9]，还有[@,$]组成，每样起码一个
// 2-账户长度不能少于5个字符
// 3-邮箱要符合格式，用户昵称2~10个字符


// 将创建和绑定的方法结合使用,一气呵成
Vue.createApp({
	data() {
		return {
			// 用于切换显示界面的布尔值
			showTab: true,
			// 用于存储账户信息的对象
			user: {
				username: "xiaoli",
				password: "123456"
			},
			// 实现注册功能
			// 这里也体现了使用对象保存值的好处,可以防止变量名冲突
			register: {
				username: "xiaowang",
				password: "123456",
				nickname: "小王456",
				email: "1351515121@qq.com"
			},
			// 使用一个布尔值，判断账户是否允许注册
			registerHint: true,
		}
	},
	methods: {
		// 用于显示切换效果的布尔值
		Tab() {
			this.showTab = !this.showTab;
		},
		// 实现登陆的函数
		loginSend() {
			let {
				username,
				password
			} = this.user;

			// 要求用户输入不为空
			if (username && password) {
				// 向后端请求登陆
				axios.get(
						`http://localhost:3000/users?username=${username}&password=${password}`)
					.then((rls) => {
						console.log("登陆请求结果集", rls);
						if (rls.data.length > 0) {
							alert(`用户[${rls.data[0].nickname}]登陆成功,欢迎回来`);
							
							// 跳转到新的页面
							window.location = `http://127.0.0.1:8848/前端实训/作业/购物车2.0/main.html?username=${username}`;
						} else {
							alert("登陆失败,请检查账户密码");
						}
					}).catch((error) => {
						console.log("网络请求失败,请重新尝试");
					});
			} else {
				alert("登陆的账户密码不能为空");
			}
		},
		// 实现注册的函数
		registerSend() {
			// 实现数据的前端验证
			// 事实上，数据会被验证两遍，前端验证一遍，后端验证一遍
			// 前端验证有风险，js代码是发送给前端执行的，如果通过浏览器修改前端代码，能够解决前端数据验证，所以不够安全
			// 前端验证，主要是为了验证数据的格式，让用户不用每次验证格式，都提交一次数据，对于服务器来说是优化的，因为可以节省服务器资源
			// 后端验证主要保证数据确实是可靠的，符合要求的数据，防止脏数据和sql注入攻击
			let {
				username,
				password,
				nickname,
				email
			} = this.register;

			// 验证数据是否符合不为空
			// 验证账户是否是注册过的账户
			if (username && password && nickname && email && this.registerHint) {
				// 向后端发送注册请求
				axios.post("http://localhost:3000/users", this.register).then((rls) => {
					console.log("注册请求结果集", rls);
				}).catch(() => {
					console.log("网络请求失败,请重新尝试");
				});
			} else {
				alert("数据有错误，请检查");
			}
		},
	},
	// 使用侦听器,实现重名的账户验证
	watch: {
		// 侦听对象中的属性的变化
		"register.username": {
			// 当注册表单中的值发送变化的时候,验证账户是否可用
			// 这样可以实现实时的账户验证，但是又面临了新的问题
			// 客户端在短时间内，重复发生大量请求给服务器，这样服务器的压力会非常大（抖动）
			// 解决这个问题的方法我们称之为防抖和节流
			// 在这里，我们使用v-model.lazy方法，实现防抖
			handler(newValue, oldValue) {
				// console.log("账户名称发生了变化", newValue);
				// 当数据发生变化以后,我们去向后端请求是否有这个账户
				axios.get(`http://localhost:3000/users?username=${newValue}`)
					.then((rls) => {
						// console.log("验证账户的请求结果集", rls);
						// 使用返回的长度,验证是否已经存在该账户
						if (rls.data.length > 0) {
							console.log("该账户名称已存在,请换一个");
							this.registerHint = false;
						} else {
							console.log("该账户名称可以使用");
							this.registerHint = true;
						}
					}).catch((error) => {
						console.log("网络请求失败,请重新尝试", error);
					});
			}
		}
	}
}).mount("#app");
// vue3中一个页面可以挂载多个元素,vue2中不允许这样做