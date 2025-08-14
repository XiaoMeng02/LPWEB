<template>
	<div>
		<h1>这个是Left组件, 数据是: {{ number }}</h1>
		<button @click="number++">递增</button>
	</div>
</template>

<script>
	export default {
		// 因为组件的切换，有创建跟销毁的过程，所以每一次的组件
		// 都是一个全新的组件，如果每一次创建的组件，都被保留
		// 会极大的拖慢浏览器的响应速度，所以更好的方法是每一次都创建一个对象
		data: function() {
			return {
				number: 0
			}
		},
		// 创建的生命周期
		created() {
			console.log('left组件被创建了');
		},
		// 销毁前生命周期
		beforeUnmount() {
			console.log('Left组件被销毁了');
		},
		// 被保存的组件，不会被重复的创建销毁
		// 触发的是另外两个生命周期事件
		// 缓存生命周期事件
		deactivated() {
			console.log('Left组件被缓存了');
		},
		activated() {
			console.log('Left组件被激活了');
		},
		porps: ["userlist"]
		// 什么是生命周期的钩子函数？
		// 在组件的整个生命中，有很多重要的节点，比如说这里的创建，和销毁，那么钩子函数可以在这些关键的生命周期被触发的时候，执行代码
	}
</script>

<style>

</style>