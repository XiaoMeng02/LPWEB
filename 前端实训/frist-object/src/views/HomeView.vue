<!-- 组件代码 -->
<template>
	<div class="about">
		<h1>这是主页页面</h1>
	</div>
	<!-- 使用组件 -->
	<hello-world></hello-world>
	<!-- 如果父组件不能给子组件传值 -->
	<!-- 每一个子组件用法都一样，所以需要传递值 -->
	<button-cpt></button-cpt>
</template>


<!-- 每个视图或者组件,都是由html,css,js组成的 -->
<!-- js代码 -->
<script>
	// 导入helloworld组件
	// import HelloWorld from "../components/HelloWorld.vue"
	// 无论当前的文件处于那个位置,我们都可以使用@符号找到指定的文件夹
	import HelloWorld from "@/components/HelloWorld.vue"
	import ButtonCpt from "@/components/ButtonCpt.vue";

	export default {
		name: "HomeView",
		components: {
			HelloWorld,
			ButtonCpt
		}
	}
</script>

<!-- css样式 -->
<!-- 给每个元素都设置同样的自定义属性是一个解决方法 -->
<!-- vue给了一个scoped属性,让我们可以不用手动添加属性 -->
<!-- 设置了这个属性的组件,vue在构筑的时候,会加一点额外的内容 -->
<style scoped type="text/css">
	/* 但是,当其他组件也设置div的字体颜色为某个颜色时 */
	/* 设置的样式就发生了冲突 */
	div {
		color: #ffaa7f;
	}

	/* 按钮字体颜色样式 */
	button {
		color: #aa00ff;
	}
</style>