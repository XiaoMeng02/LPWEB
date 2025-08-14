<template>
	<h1>登陆账户</h1>
	username<input type="text" /><br>
	password<input type="text" /><br>
	<button @click="login()">登陆</button>
</template>

<script setup>
	// 1、导入路由的创建函数
	import {
		useRouter
	} from 'vue-router';

	// 2、创建路由实例对象
	const router = useRouter();

	// 登陆的函数
	let login = () => {
		// 当登陆完成后,跳转至功能页面
		// 这种跳转行为,称之为编程式导航
		router.push("/home");
	}
</script>

<style>
</style>