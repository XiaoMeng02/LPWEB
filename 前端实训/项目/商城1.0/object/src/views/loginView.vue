<template>
	<div class="login-container">
		<!-- 背景图 -->
		<div class="login-bg" ref="loginBg"></div>

		<!-- 登录卡片 - 响应式设计，移动端占满全屏 -->
		<div class="login-card" ref="loginCard">
			<!-- 移动端标题区域 -->
			<div class="mobile-header">
				<h1 class="app-name">应用登陆</h1>
			</div>

			<div class="login-header">
				<h2 class="login-title">登录页面</h2>
			</div>

			<el-form ref="loginFormRef" :model="user" :rules="loginRules" class="login-form">
				<!-- 账户输入框 -->
				<el-form-item prop="username">
					<el-input v-model="loginUser.username" placeholder="请输入账号" prefix-icon="User" maxlength="15"
						size="large"></el-input>
				</el-form-item>

				<!-- 密码输入框 -->
				<el-form-item prop="password">
					<el-input v-model="loginUser.password" type="password" placeholder="请输入密码" prefix-icon="Lock"
						show-password maxlength="18" size="large"></el-input>
				</el-form-item>

				<!-- 用户协议 -->
				<el-form-item>
					<el-tooltip class="box-item" effect="dark" content="需要同意用户协议才可登录" placement="right-end">
						<el-checkbox v-model="agreed" prop="agreed">同意用户协议</el-checkbox>
					</el-tooltip>
				</el-form-item>

				<!-- 登录按钮组 -->
				<el-form-item class="login-btn-group">
					<el-button type="primary" size="large" class="login-btn" @click="login()">
						登录
					</el-button>
					<el-button type="text" class="register-link" @click="router.push('/Register')">
						还没有账号？去注册
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
	} from 'vue'
	// 导入网络请求对象
	import axios from '@/axios';
	// 导入elementplus插件
	import {
		ElNotification
	} from 'element-plus';
	import {
		useRouter
	} from 'vue-router'
	import useUser from "@/store/user";

	// 路由实例
	const router = useRouter()
	// 用户的仓库实例
	const user = useUser();


	// 登录用户信息
	const loginUser = reactive({
		username: 'xiaozhang', // 用户名
		password: '123456' // 密码
	})

	// 完成登陆功能
	const login = async () => {
		// 验证输入，如果输入为空，则不允许发送
		if (!loginUser.username || !loginUser.password) {
			// 发生错误的时候，使用消息框提示用户
			ElNotification({
				title: '验证错误！',
				message: '账户密码不能为空',
				type: 'error',
			})
			// 退出循环,不允许发送
			return false;
		}

		// 向后端，请求登陆用户数据
		let {
			data
		} = await axios.get("/users", {
			// 将数据发送给后端进行对比
			params: {
				username: loginUser.username,
				password: loginUser.password
			}
		});

		// 验证账户是否登陆成功
		if (data.length == 0) {
			// 登陆失败
			ElNotification({
				title: '登陆失败！',
				message: '账户密码可能有误',
				type: 'error',
			})
		} else {
			// 登陆成功
			// 1-将用户的数据保存
			// 这样保存没有任何的意义
			// let user = data;
			// 我们需要将用户信息，保存到仓库中
			user.userMessage = data[0];

			// 2-跳转至首页页面
			router.push("/home");
		}

		// 这种业务流程,也被称之为业务线
	}
</script>

<style scoped>
	/* 基础容器使用弹性布局 */
	.login-container {
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
	.login-bg {
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

	/* 登录卡片样式 - 响应式设计 */
	.login-card {
		width: 100%;
		max-width: 420px;
		padding: 40px;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 20px;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
		z-index: 2;
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-sizing: border-box;
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.8);
	}

	/* 卡片悬停效果 - 仅在非移动端显示 */
	.login-card:hover {
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
		transform: translateY(-5px) scale(1.01);
	}

	.login-header {
		text-align: center;
		margin-bottom: 30px;
	}

	.login-title {
		font-size: 28px;
		font-weight: 700;
		color: transparent;
		background: linear-gradient(135deg, #aaaaff 0%, #66b1ff 100%);
		-webkit-background-clip: text;
		background-clip: text;
		margin-bottom: 12px;
		letter-spacing: 0.5px;
	}

	.login-form {
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
		height: 52px;
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

	.el-button--text {
		margin: 0px;
	}

	.login-btn-group {
		margin-top: 30px;
		margin-bottom: 15px;
	}

	.login-btn {
		width: 100%;
		height: 54px;
		font-size: 16px;
		font-weight: 500;
		border-radius: 12px;
		background: linear-gradient(135deg, #aaaaff 0%, #66b1ff 100%);
		border: none;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 10px 20px rgba(64, 158, 255, 0.25);
			background: linear-gradient(135deg, #aaaaff 0%, #66b1ff 100%);
		}

		&:active {
			transform: translateY(0);
			box-shadow: 0 5px 10px rgba(64, 158, 255, 0.2);
		}

		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 150%;
			height: 150%;
			background: rgba(255, 255, 255, 0.15);
			transform: translate(-50%, -50%) rotate(30deg);
			transition: all 0.6s ease;
			opacity: 0;
		}

		&:active::after {
			opacity: 1;
			width: 200%;
			height: 200%;
			transition: all 0s;
		}
	}

	.register-link {
		text-align: center;
		margin-bottom: 0;
		width: 100%;
	}

	.el-button--text {
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
			background-color: #aaaaff;
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
		.login-container {
			align-items: flex-start;
		}

		.login-card {
			/* 移动端表单占据整个页面 */
			height: 100vh;
			max-width: 100%;
			width: 100%;
			border-radius: 0;
			padding: 50px 20px;
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
		.login-header {
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

		.login-header {
			margin: 40px 0 30px;
		}

		.login-title {
			font-size: 26px;
		}

		.login-form {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		.el-input,
		.login-btn {
			height: 54px;
			font-size: 16px;
		}

		.el-form-item {
			margin-bottom: 24px;
		}

		.login-btn-group {
			margin-top: 40px;
			margin-bottom: 20px;
		}

		.register-link {
			margin-bottom: 30px;
		}

		.mobile-footer {
			text-align: center;
			padding: 20px 0;
			font-size: 12px;
			color: #6b7280;
		}

		/* 移除悬停效果 */
		.login-card:hover {
			box-shadow: none;
			transform: none;
		}
	}
</style>