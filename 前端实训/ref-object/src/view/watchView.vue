<template>
	<div id="box">
		<h1>这个是实现了监听的组件</h1>
		<p>消息: {{message}}</p>
		<input type="text" v-model="message" />
	</div>
</template>

<script>
	import {
		reactive,
		ref,
		watch
	} from 'vue';

	export default {
		setup() {
			// 定义一个响应式数据
			let message = ref('helloworld');

			// 对象的深度监听
			let user = reactive({
				username: "xiaoli",
				password: "123456"
			});

			// 实现数据的侦听
			// 第一个参数是需要侦听的对象
			// 第二个参数,是侦听到变化时,进行的回调函数
			watch(message, (newValue, oldValue) => {
				// 输出修改后的值和修改之前的值
				console.log("newValue:", newValue)
				console.log("oldValue:", oldValue)
			})
			// 通过这样的方式，我们可以实现之前的侦听值的效果
			// 这里的监听方法，会自动的实现深度监听，不需要设置
			watch(user, (newValue, oldValue) => {
				// 输出修改后的值和修改之前的值
				console.log("newValue:", newValue)
				console.log("oldValue:", oldValue)
			}, {
				// 深度监听属性
				deep: true,
				// 立即监听
				immediate: true,
			})


			// 返回响应式数据的内容
			return {
				message,
				user
			}
		}
	}
</script>

<style>
</style>