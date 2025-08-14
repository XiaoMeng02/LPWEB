<template>
	<h1>这个是子组件</h1>
	<h2>子组件中的user数据:{{user}}</h2>
	<h2 v-if="start">用户已登录</h2>
	<h2 v-else>用户未登录</h2>
	<h1>修改绑定数据</h1>
	<!-- eslint插件会规范这些错误，这些错误有时候不会影响运行 -->
	<!-- 一些不好的习惯，不好的写法也会报错 -->
	username <input type="text" v-model="user.username" /><br>
	password <input type="text" v-model="user.password" /><br>
	age <input type="text" v-model="user.age" /><br>
	<button @click="start = !start">登陆</button>
</template>

<script>
	export default {
		// 组合式api获取值的方法
		// setup(props) {
		// 	console.log("setup的参数", props);

		// 	return {

		// 	}
		// },
		// 选项式api获取props传入值的方法
		// 这个数据是一个复杂类型的对象，这样的对象类型，并不能实现单向数据流的要求，子组件中的修改会对父组件造成影响
		props: {
			user: {
				type: Object,
				default: () => ({})
			},
			// props传入的简单类型，是只读的，不能被修改的
			start: {
				type: Boolean,
			}
		}
	}
</script>

<style>
</style>