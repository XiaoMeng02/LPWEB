<template>
	<category-view></category-view>
	<p>--------------------------------------------------------------</p>
	<!-- 使用用户信息的相关组件 -->
	<!-- 原始用法1  使用单独的v-bind进行传参-->
	<!-- <user-list :username="userMessage.username" :password="userMessage.password" :time="userMessage.time"></user-list> -->
	<p>--------------------------------------------------------------</p>
	<!-- 原始用法2  使用固定的字符串传参-->
	<user-list username="xiaogang" time="userMessage.time"></user-list>
	<!-- 进阶用法 使用v-bind -->
	<!-- id就是非props属性 ，当子组件有一个唯一的根节点的时候 -->
	<!-- 这个非porp属性就会继承给唯一的根节点 -->
	<p>--------------------------------------------------------------</p>
	<user-list id="UserBox" class="list" v-bind="userMessage"></user-list>
	<p>--------------------------------------------------------------</p>
	<child-cpt></child-cpt>

	<p>--------------------------------------------------------------</p>
	<!-- 最好使用驼峰命名法的方法 -->
	<home-view></home-view>
	<p>--------------------------------------------------------------</p>
	<about-view></about-view>
</template>
<!-- App.vue的组件,是所有的组件的父组件 -->
<!-- 能够使得页面无需刷新,就能加载另一个页面的行为sfc 单页面应用  -->

<!-- 每一个组件,都由自己的html组件 css样式 和js代码组成 -->
<script>
	// 使用组件的方法(传统方法)
	import HomeView from "@/views/HomeView.vue";
	// 改进方法 使用 @代替路径 这个路径是从src这个文件夹开始的
	import AboutView from "@/views/AboutView.vue"
	import UserList from "@/components/UserList.vue"
	import ChildCpt from "@/components/ChildCpt.vue"

	// 这个对象,是我们当前组件的vue对象
	// 这样的写法,会让该组件的vue对象变成默认导出的对象
	export default {
		name: 'App',
		data() {
			return {
				// 要给子组件传值，需要父组件有对应的值
				userMessage: {
					username: "xiaozhang",
					password: "abcdef",
					time: 12,
				}
			}
		},
		methods: {

		},
		// 注册组件
		// 这里注册的Home组件还是About组件,都只能在当前的组件中使用,也就是说,局部组件在哪里注册,就只能在哪里使用
		components: {
			HomeView,
			AboutView,
			UserList,
			ChildCpt
		},
	}
</script>

<style>
	/* 这里的字体颜色设置的和div不是一个级别 */
	/* 子元素会显示红色,是因为字体属性的继承的原因 */
	#app {
		color: red;
		font-size: 20px;
	}

	/* 给子组件指定一个样式 */
	/* 非prop属性特别合适，给子组件设置样式 */
	#UserBox {
		background: #000000;
		color: #ffffff;
	}
</style>