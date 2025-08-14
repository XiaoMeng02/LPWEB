<template>
	<div id="box">
		<h1>这个是App组件</h1>
		<!-- 1.和之前的绑定方法不同，这里其实是在获取元素 -->
		<p ref="pRef">今天天气很晴朗,处处好风光</p>
		<button @click="getPNodeHandle">获取p元素</button>
		<!-- 使用自定义组件 -->
		<hello-world ref="userRef"></hello-world>
	</div>
</template>

<script>
	import HelloWorld from "@/components/HelloWorld.vue";

	import {
		onMounted,
		ref
	} from 'vue'
	export default {
		name: 'App',
		setup() {
			// 声明一个，用于保存元素的容器
			// 等页面加载完成，就实现了页面元素，和该容器的绑定
			let pRef = ref();

			// 声明组件的容器
			// 声明的变量一定要和元素中变量相对应
			let userRef = ref();


			// 直接获取这个元素
			console.log('直接获取元素:', pRef.value);
			console.log('直接获取组件:', userRef.value);

			// 使用生命周期钩子函数，保证获取到该元素的时，页面已经构建完成
			onMounted(() => {
				console.log('生命周期中获取元素:', pRef.value);
				console.log('生命周期中获取组件:', userRef.value);
			})

			// 事件中获取节点的方法
			let getPNodeHandle = () => {
				console.log('事件中获取元素:', pRef.value);
				console.log('事件中获取组件:', userRef.value);
				// 获取到该元素后，可以对该元素进行操作
				pRef.value.innerText = "这是修改后的文本";
				// 这种获取元素并且修改该元素的方法，用的非常少
				// 大部分的行为，vue都可以使用数据驱动的方式完成

				// 获取组件中的 html css 和vue对象
				console.log("组件中的元素", userRef.value.$el);
				console.log("组件中属性", userRef.value.username);
				console.log("组件中的方法", userRef.value.run);
			}

			// 这种绑定元素的方法，尽量少使用
			// 因为大部分通过绑定元素实现的内容，都可以使用数据驱动实现

			return {
				pRef,
				getPNodeHandle,
				userRef
			}
		},
		components: {
			HelloWorld
		}
	}
</script>

<style>

</style>