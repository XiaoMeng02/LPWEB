<template>
	username:<input type="text" v-model="username"><br>
	password:<input type="text" v-model="password"><br>
	<button @click="btnClickHandle"> 提交按钮 </button>
</template>

<script>
	export default {
		name: "ChildCpt",
		data() {
			return {
				username: "",
				password: ""
			}
		},
		methods: {
			// 点击触发事件
			btnClickHandle() {
				console.log("用户登陆信息如下", this.username, this.password);
				// 我们需要将值传递给父组件
				// 当事件被触发的时候，我们需要使用一种被称之为发射事件的行为
				//  $是自带的方法
				this.$emit('sendUsersHandle', this.username, this.password);
			}
		}
	}
</script>

<style>
</style>