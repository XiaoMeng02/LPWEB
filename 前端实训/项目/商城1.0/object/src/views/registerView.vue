<template>
	<div class="register-container">
		<!-- 背景图 -->
		<div class="register-bg"></div>

		<!-- 注册卡片 - 响应式设计 -->
		<div class="register-card">
			<!-- 移动端标题区域 -->
			<div class="mobile-header">
				<h1 class="app-name">注册账户</h1>
			</div>

			<div class="register-header">
				<h2 class="register-title">注册页面</h2>
			</div>

			<!-- 注册表单 -->
			<el-form class="register-form" :model="registerForm" status-icon label-width="90px">
				<!-- 昵称输入 -->
				<el-form-item label="昵称:" prop="nickname">
					<el-input v-model="registerForm.nickname" placeholder="请输入一个昵称">
						<template #append>
							<el-tooltip class="box-item" effect="dark" content="随机一个！" placement="right-start">
								<el-icon style="cursor: pointer;" @click="setNickName">
									<Refresh />
								</el-icon>
							</el-tooltip>
						</template>
					</el-input>
				</el-form-item>

				<!-- 账户输入 -->
				<el-form-item label="账户:" prop="username">
					<el-input v-model="registerForm.username" placeholder="请输入一个账户">
					</el-input>
				</el-form-item>

				<!-- 密码输入 -->
				<el-form-item label="密码1:" prop="password">
					<el-input v-model="registerForm.password" placeholder="请输入密码" show-password></el-input>
				</el-form-item>

				<!-- 确认密码 -->
				<el-form-item label="密码2:" prop="passwordAg">
					<el-input v-model="registerForm.passwordAg" placeholder="请重复输入密码" show-password></el-input>
				</el-form-item>

				<!-- 个性签名 -->
				<el-form-item label="个性签名:">
					<el-input v-model="registerForm.bio" resize="none" maxlength="50" type="textarea" rows="4"
						placeholder="请输入您的签名,最大长度为50"></el-input>
				</el-form-item>

				<!-- 按钮组 -->
				<el-form-item class="register-btn-group" label-width="0">
					<el-button color="#aaaaff" type="primary" plain @click="register"
						class="register-btn">注册</el-button>
					<el-button color="#00aaff" type="text" @click="router.push('/')" class="login-link"> 去登录
					</el-button>
				</el-form-item>
			</el-form>

			<!-- 移动端底部信息 -->
			<div class="mobile-footer">
				<p>© 2025 版权所有</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		reactive
	} from 'vue';
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus';
	import {
		useRouter
	} from 'vue-router'
	import RandomName from '@/plus/RandomName.js';
	import axios from '@/axios'

	// 路由实例
	const router = useRouter()


	// 注册表单数据绑定
	// 这也是一个比较常见的测试方法,使用固定的值进行测试
	const registerForm = reactive({
		// 随机一个昵称的效果
		nickname: RandomName.getNickName(), // 昵称
		username: "xiaozhang", // 账户名
		password: "123456", // 密码
		passwordAg: "123456", // 确认密码
		bio: "这是一个管理员账户" // 个性签名
	});

	// 随机昵称的函数
	let setNickName = () => {
		registerForm.nickname = RandomName.getNickName();
	}


	// 向后端请求注册
	let register = async () => {
		// 将数据验证以后再进行请求
		// 将数据进行解构
		let {
			nickname,
			username,
			password,
			passwordAg,
			bio
		} = registerForm;


		// 验证该username是否可以使用
		let {
			// 使用起别名的方式,给值重新声明一个变量名称
			data: getUsername
		} = await axios.get("/users", {
			params: {
				// 查看是否有相同的账户
				username
			}
		});

		// 验证用户尝试使用的username是否存在，如果存在，则不允许注册
		// 如果不存在，则允许注册
		// 使用获取到的值,判断是否可以使用这个username,注册名称
		// 如果获取到的数组长度大于0,那么说明该username已经被使用过了
		if(getUsername.length > 0){
			ElMessage({
				message: '该账户已被注册,请换一个重试',
				type: 'warning',
			})
			
			return false;
		}



		// 表单验证
		if (username == "") {
			// 账户名称不能为空
			ElMessage({
				message: '账户名称不能为空',
				type: 'warning',
			})

			return false;
		} else if (password == "" || passwordAg == "") {
			// 输入密码不能为空
			ElMessage({
				message: '输入密码不能为空',
				type: 'warning',
			})

			return false;
		} else if (password != passwordAg) {
			// 两次输入密码不一致
			ElMessage({
				message: '两次输入密码不一致',
				type: 'warning',
			})

			return false;
		}

		// 重新构建注册表单对象
		let user = {
			nickname,
			username,
			password,
			bio
		}


		// 等待这个异步请求完成以后，再去执行其他的代码
		let {
			data
		} = await axios.post("/users", user);

		console.log("返回的数据:", data);

		// 请求成功的处理
		// 判断注册是否成功
		// 如果成功，弹出弹窗，提示用户
		// 跳转至登陆页面
		ElMessageBox.alert('快去登陆试试把！', '注册成功!', {
			confirmButtonText: '去登陆',
			callback: () => {
				router.push('/')
			},
		})
	}
</script>

<style scoped>
	/* 基础容器样式 */
	.register-container {
		position: relative;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		overflow: hidden;
		background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
	}

	/* 背景图样式 */
	.register-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('@/../public/background/loginBg.svg');
		background-size: cover;
		background-position: center;
		z-index: 1;
		filter: brightness(0.95);
		transition: filter 0.3s ease;
	}

	/* 注册卡片样式 */
	.register-card {
		width: 100%;
		max-width: 500px;
		padding: 0px 20px 10px 0px;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20px;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
		z-index: 2;
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-sizing: border-box;
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.8);
	}

	/* 卡片悬停效果 */
	.register-card:hover {
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
		transform: translateY(-5px) scale(1.01);
	}

	/* 标题样式 */
	.register-header {
		text-align: center;
		margin-bottom: 30px;
	}

	.register-title {
		font-size: 28px;
		font-weight: 700;
		color: transparent;
		background: linear-gradient(135deg, #aaaaff 0%, #66b1ff 100%);
		-webkit-background-clip: text;
		background-clip: text;
		margin-bottom: 12px;
		letter-spacing: 0.5px;
	}

	/* 表单样式 */
	.register-form {
		width: 100%;
	}

	.el-form-item {
		margin-bottom: 20px;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1px;
			background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
		}
	}

	.el-input {
		height: 100%;
		width: 100%;
		border-radius: 12px;
		border: 1px solid #e2e8f0;
		transition: all 0.3s ease;
		background-color: rgba(255, 255, 255, 0.8);

		&:hover {
			border-color: #cbd5e1;
			box-shadow: 0 0 0 3px rgba(226, 232, 240, 0.3);
		}

		&:focus-within {
			border-color: #409eff;
			box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.2);
			transform: translateY(-1px);
		}

		.el-input__wrapper {
			border: none !important;
			box-shadow: none !important;
			background-color: transparent !important;
		}
	}

	/* 进度条容器 */
	.loadingBox {
		width: 100%;
		height: 30px;
		margin-top: 10px;
	}

	/* 按钮组样式 */
	.register-btn-group {
		margin-top: 30px;
		margin-bottom: 15px;
		display: flex;
		flex-direction: column;
		gap: 15px;
		justify-content: center;
		padding-left: 20px;
	}

	.register-btn {
		width: 100%;
		height: 50px;
		font-size: 20px;
		font-weight: 500;
		border-radius: 12px;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;
	}

	.el-button--text {
		margin: 0px;
	}


	/* 登录链接样式 */
	.login-link {
		text-align: center;
		margin-bottom: 0;
		width: 100%;
		color: #409eff;
		font-size: 14px;
		transition: all 0.3s ease;
		position: relative;

		&:hover {
			color: #3691e8;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: -2px;
			left: 0;
			width: 0;
			height: 1px;
			background-color: #409eff;
			transition: width 0.3s ease;
		}

		&:hover::after {
			width: 100%;
		}
	}

	/* 移动端特有样式 */
	.mobile-header,
	.mobile-footer {
		display: none;
	}

	/* 响应式调整：移动端设备（小于768px） */
	@media (max-width: 768px) {
		.register-container {
			align-items: flex-start;
		}

		.register-card {
			height: 100vh;
			max-width: 100%;
			width: 100%;
			border-radius: 0;
			padding: 50px 20px 50px 0px;
			box-shadow: none;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		/* 显示移动端特有元素 */
		.mobile-header,
		.mobile-footer {
			display: block;
			margin-bottom: 40px;
		}

		/* 隐藏替换样式 */
		.register-header {
			display: none;
		}

		.mobile-header {
			text-align: center;
			padding: 0px 0;
		}

		.app-name {
			font-size: 30px;
			font-weight: bold;
			color: transparent;
			background: linear-gradient(135deg, #aaaaff 0%, #66b1ff 100%);
			-webkit-background-clip: text;
			background-clip: text;
			margin: 0;
		}

		.register-form {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: left;
		}

		.el-input {
			height: 100%;
			width: 100%;
			font-size: 13px;
		}

		.register-btn {
			height: 35px;
			width: 100%;
			font-size: 20px;
		}

		.el-form-item {
			margin-bottom: 17px;
		}

		.register-btn-group {
			margin-top: 10px;
			margin-bottom: 20px;
		}

		.login-link {
			margin-bottom: 30px;
		}

		.mobile-footer {
			text-align: center;
			padding: 20px 0;
			font-size: 12px;
			color: #6b7280;
		}

		/* 移除悬停效果 */
		.register-card:hover {
			box-shadow: none;
			transform: none;
		}
	}
</style>