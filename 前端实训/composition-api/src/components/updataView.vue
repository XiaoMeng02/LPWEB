<template>
	<div>
		<h1>这个是实现了单项数据流的子组件</h1>
		<h2>数据: {{user}}</h2>
		<button @click="updateUser">修改传递过来的值</button>
	</div>
</template>

<script>
	export default {
		props: {
			user: {
				type: Object,
				default: () => ({})
			},
		},
		// setup接收两个值
		setup(props, context) {
			// 1. 修改地址信息
			let updateUser = () => {
				// 发射事件
				// context 上下文 包含了vue对象的内容，等价于之前的this  
				console.log("是否发送？");
				// 比如之前发射时候使用的 this.emit
				context.emit('updateUser', {
					username: "xiaowang",
					password: "135651",
					age: 20
				});
			}

			// 2、返回
			return {
				updateUser
			}
		}
	}
</script>

<style>
</style>