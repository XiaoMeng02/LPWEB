<template>
	<!-- 自定义属性 -->
	<div data-v-01 class="about">
		<h1 data-v-01>这是一个介绍页面</h1>
	</div>
	<button data-v-01>这是一个按钮</button>

	<!-- 父组件使用了HomeView组件 -->
	<!-- 在父组件中同样使用了的About组件是否也可以使用该组件? -->
	<!-- 不可以,这个组件无法被解析 -->
	<home-view></home-view>

	<!-- 使用全局组件 -->
	<category-view></category-view>
</template>


<script>

	export default {
		name: "AboutView",
	}
</script>


<!-- views视图文件夹 -->
<!-- 这个文件夹放置专门的一个页面 -->
<!-- 比如登陆注册页面,这种页面是一个独立的页面 -->
<!-- 独立页面里面由一些组件组成,轮播图,导航栏等 -->
<!-- 这些更小的组件,就不能称之为视图 -->

<style type="text/css">
	/* 在div中选择属性为data-v-01的元素 */
	/* 额外添加一个属性选择器,这样的写法有两个好处 */
	/* 1 是提高了选择器优先级 */
	/* 2 限定了选择的范围,只选择当前的组件 */
	div[data-v-01] {
		color: #00ff7f;
	}
</style>