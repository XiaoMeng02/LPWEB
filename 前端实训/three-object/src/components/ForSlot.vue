<template>
	<div>
		<!-- 在组建中,循环渲染这个值 -->
		<template v-for="(item,index) in newlist" :key="index">
			<!-- 循环渲染的里面是一个插槽 -->
			<!-- 就如同之前所说的,如何渲染这个循环,由父组件决定 -->
			<!-- 插槽中,反过来,给父组件的元素传入了值 -->
			<slot :item="item" :index="index"></slot>
		</template>
	</div>
</template>

<script>
	// 通过props的属性,获取循环的数据
	export default {
		// 需要对传入的值做限制,才使用对象形式接收
		props: ['newlist'],
	}
</script>

<style>
</style>