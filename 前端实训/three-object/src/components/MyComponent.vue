<template>
	<div>
		<h4>这是第一个插槽</h4>
		<!-- 尽管插槽的类型，查重的样式都不清楚 -->
		<!-- slot标签，表示插槽元素应该放在哪里 -->
		<slot name="default">
			<!-- 如果想设置默认的值或者缺省值，只需要在slot中添加即可 -->
			<button>默认按钮</button>
		</slot>
		<h4>这是第二个插槽</h4>
		<!-- 这里，slot标签给了两次，那么传入的元素也会显示两次 -->
		<!-- 这种使用方法，称之为匿名插槽 -->
		<slot name="default"></slot>
	</div>
</template>

<script>
	export default {

	}
</script>

<style>
</style>