<template>
	<button>这是一个组件按钮</button>
</template>

<script>
	export default {
		name: "ButtonCpt",
	}
</script>

<!-- 设置样式只在当前范围内生效 -->
<style scoped>
	button {
		padding: 10px 5px;
	}
</style>