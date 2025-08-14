<template>
	<h1>这是helloworld组件</h1>
</template>
<!-- 这种组件,是组成视图组件的一部分,可以被复用 -->

<script>
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
		}
	}
</script>

<style scoped>

</style>