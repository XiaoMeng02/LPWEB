<template>
	<p>登陆注册页面</p>
	<!-- 给插槽起一个名字 -->
	<!-- 输入表单 -->
	<slot name="from">
		<!-- 无论是命名插槽还是匿名插槽,只要缺少传入的内容,那么都会显示默认的元素 -->
		默认输入框<input type="text" /><br />
	</slot>
	<!-- 按钮 -->
	<slot name="btn">
		<button>默认按钮</button>
	</slot>
</template>

<script>
</script>

<style>
</style>