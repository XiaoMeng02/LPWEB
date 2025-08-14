<template>
	<!-- <new-view></new-view> -->
	<!-- <computed-view></computed-view> -->
	<h1>这个是父组件</h1>
	<h2>父组件中的user数据: {{user}}状态{{start}}</h2>
	<user-component :user="user" :start="start"></user-component>
	<!-- 遵循了单项数据流规则的组件 -->
	<!-- 子组件发射过来的事件，父组件中需要一个值接收 -->
	<updata-view :user="user" @updateUser="receiveHandle"></updata-view>
	<!-- 使用同样的子组件，进行修改操作 -->
	<!-- 不同之处，在于传入的值，是否被只读函数封装 -->
	<user-component :user="userOnly" :start="start"></user-component>
</template>

<script>
	// import NewView from "@/components/NewView.vue"
	// import ComputedView from "@/components/ComputedView.vue"
	import {
		reactive,
		ref,
		readonly
	} from "vue"
	import userComponent from "@/components/userComponent.vue"
	import updataView from "@/components/updataView.vue"

	export default {
		name: "app",
		setup() {
			// 第一次，将数据变成了响应式的数据
			let user = reactive({
				username: "xiaoli",
				password: "123456",
				age: 18
			})

			// 将已经定义好的数据进行二次封装
			// 第二次封装，我们将值变成了只读类型的值
			// 通过这样的方式，我们实现了被动的值不允许被修改的方式
			let userOnly = readonly(user);

			// 如果子组件确实要修改该值，那么依然使用发射事件的方式实现，要注意的是，发射事件，依然不能修改userOnly这个值
			// 值一旦设置成了只读类型，那么在哪里都无法被修改，要修改只能修改原本的值
			userOnly.username = "小张";

			// 通过ref函数绑定值的方法
			let start = ref(true);
			// 在vue中获取页面上的某个元素，也是ref方法

			// 监听子组件数据变化要求的函数
			let receiveHandle = (data) => {
				console.log("是否接收？", data);
				// 这里直接进行赋值是万万不可的
				console.log("user在修改之前", user);
				// user = data;
				console.log("user在修改之后", user);
				// 修改对象类型的值的时候，不要去直接赋值
				// 这样，会使得原本响应式的值变成普通类型的值
				// 正确的写法，是使用es6的结构方法，结构对象
				let {
					username,
					password,
					age
				} = data;
				// 解构以后再进行赋值
				user.username = username;
				user.password = password;
				user.age = age;

				// 修改后的user值
				console.log(user.username);
			}

			return {
				user,
				userOnly,
				start,
				receiveHandle
			}
		},
		components: {
			// NewView,
			// ComputedView,
			userComponent,
			updataView,
		}
	}
</script>

<style>

</style>