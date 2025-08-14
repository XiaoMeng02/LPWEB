<template>
	<!-- vue中的文本:{{message}}<br> -->
	<!-- vue中如果真的需要在页面上获取某个元素 -->
	<!-- 需要将获取的元素，绑定一个ref属性 -->
	<!-- 修改的文本:<input ref="getNode" type="text" v-model="message" /><br> -->
	<!-- <button @click="updata">修改</button> -->

	<!-- 将获取元素的属性绑定到子组件 -->
	<!-- 子组件是一个由若干html，js，css组成的集合，使用元素方法获取该元素，会得到什么样的结构? -->
	<!-- <my-component ref="myComp"></my-component> -->
	<!-- <user-component></user-component> -->

	<!-- 这个方法用于在多个组件之间进行切换 -->
	<!-- 动态组件实现切换 -->
	<!-- 1-使用component标签，作为载体 -->
	<!-- 2-使用is属性，来对当前显示的内容进行判断 -->
	<!-- 3-修改is中的属性，实现组件的切换 -->
	<!-- <component :is="componentName" :unit="userlist"></component><br> -->
	<!-- keep-alive标签中，只允许有一个子标签 -->
	<!-- 通过这个表情包裹的动态组件，其值会被保存 -->
	<!-- 也就是说，该组件不会在切换过程中，创建和销毁 -->
	<keep-alive include="LeftView,RightView">
		<!-- 通过keep-alive标签中的include属性，可以绑定需要切换的元素，多个组件名称之间，只用 , 连接 -->
		<component :is="componentName" :unit="userlist"></component>
	</keep-alive>
	<br />
	<!-- 加一个保存状态的标签 -->
	切换组件<input type="text" v-model="componentName" />
</template>

<script>
	// 保存组件
	import MyComponent from "@/components/MyComponent.vue";
	import UserComponent from "@/components/UserComponent.vue";
	import LeftView from "@/components/LeftView.vue";
	import RightView from "@/components/RightView.vue";

	export default {
		name: 'App',
		data() {
			return {
				message: "这是一段文本",
				// 组件名称，用来实现切换组件的效果
				componentName: "LeftView",
				userlist: {
					username: 'xiaoli',
					password: "123456"
				}
			}
		},
		methods: {
			updata() {
				// 这里，是获取到元素，再进行修改
				// 这个修改行为，会绕过vue执行，vue无法检测到
				// let input = document.querySelector("input");
				// input.value = "这是一段修改过后的文本"

				// $refs获取到的是所有的绑定了ref属性的元素
				console.log("refs对象", this.$refs);
				// 通过这样的方法，我们可以获取到页面上的元素
				console.log("refs对象中具体的元素", this.$refs.getNode);
				// 进阶用法 获取子组件所有的元素,vue对象,和css
				console.log("refs对象中的子组件", this.$refs.myComp);
				console.log("访问子组件中的具体的元素", this.$refs.myComp.$el);
				console.log("访问子组件中的data数据", this.$refs.myComp.message);
			}
		},
		components: {
			MyComponent,
			UserComponent,
			LeftView,
			RightView
		}
	}
</script>

<style>

</style>