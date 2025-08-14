<template>
	<h1>404 该页面无法访问</h1>
	<h1>{{time}}秒后跳转至首页</h1>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	// 1、导入路由的创建函数
	import {
		useRouter
	} from 'vue-router';

	// 2、创建路由实例对象
	const router = useRouter();

	// 跳转时间
	let time = ref(10);

	setInterval(() => {
		time.value--;
		// 如果倒计时时间为0,那么跳转
		if (time.value == 0) {
			router.replace("/home");
		}
	}, 1000)
</script>

<style>
</style>