<template>
	<div>
		<h1>我是MyComponent组件1</h1>
	</div>
</template>

<script>
	export default {
		name: "MyComponent",
		data() {
			return {
				message: 'HelloWorld'
			}
		},
		methods: {
			run() {
				console.log('在跑步...');
			}
		}
	}
</script>

<style>

</style>