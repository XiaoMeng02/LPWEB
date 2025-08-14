<template>
	提示文本为:{{hint}}<br>
	username<input type="text" v-model="user.username" /><br>
	password<input type="text" v-model="user.password" /><br>
	age<input type="text" v-model="user.age" /><br>

</template>

<script>
	import {
		computed, //计算属性的方法，也需要从vue中获取
		reactive
	} from 'vue'
	export default {
		setup() {
			let user = reactive({
				username: "xiaoli",
				password: "123456",
				age: 18,
			});

			// 获取计算属性 参数是一个函数，通过函数返回值
			// 决定计算属性显示什么内容
			let hint = computed(() => {
				return `用户${user.username}使用密码${user.password}登陆，他当前年龄为${user.age}岁`;
			})

			// 当一个计算属性，需要设置值的时候，就使用对象方法
			let newHint = computed({
				// 获取值时的处理
				get() {
					return `用户${user.username}使用密码${user.password}登陆，他当前年龄为${user.age}岁`;
				},
				// 设置值时的处理
				set(newValue) {
					user.username = newValue;
				}
			})

			return {
				hint,
				user,
				newHint
			}
		}
	}
</script>

<style>
</style>