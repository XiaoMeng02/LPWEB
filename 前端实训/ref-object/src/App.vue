<template>
	<h1>这是根组件</h1>
	<!-- <hello-view></hello-view> -->
	<!-- <watch-view></watch-view> -->
	<!-- <watch-effect></watch-effect> -->

	<!-- 复用样式vuecli中非常简单,使用组件即可实现 -->
	<!-- 但是想要复用代码,反而变得困难了 -->
	<!-- <about-view></about-view> -->
	<!-- <home-view></home-view> -->

	<!-- 实现组件切换的方法 -->
	<!-- 这里还使用了状态保存的标签进行包裹 -->
	<keep-alive>
		<component :is="compName"></component>
	</keep-alive>
	<!-- 切换组件的方法 -->
	<button @click="toHome">切换到Home组件</button>
	<button @click="toAbout">切换到About组件</button>

	<!-- 这种切换组件的方式,被称之为前端路由,也是实现单页面应用的基础 -->
</template>

<script>
	// import HelloView from "@/view/HelloView.vue";
	// import watchView from "@/view/watchView.vue";
	// import watchEffect from "@/view/watchEffect.vue";
	import {
		ref
	} from "vue";
	// 引入修改标题的组件
	import useTitle from '@/hooks/useTitle.js';

	import AboutView from "@/view/AboutView.vue";
	import HomeView from "@/view/HomeView.vue";
	export default {
		name: 'App',
		components: {
			// HelloView,
			// watchView,
			// watchEffect,
			AboutView,
			HomeView
		},
		setup() {
			let compName = ref("AboutView");

			// 切换组件的同时,切换页面的标题
			// 保存返回回来的标题值
			let {
				title
			} = useTitle('首页-Home');

			// 两个组件的切换方法
			let toHome = () => {
				title.value = '首页-Home';
				compName.value = "HomeView";
			}
			let toAbout = () => {
				title.value = '首页-About';
				compName.value = "AboutView";
			}

			return {
				toHome,
				toAbout,
				compName
			}
		},

	}
</script>

<style>

</style>