<template>
	<div>
		<h2>这个是Home组件,计数器:{{number}}</h2>
		<button @click="increment">+1</button>
		<button @click="decrement">-1</button>
	</div>
</template>

<script>
	// 导入完成好的计算模块
	import useNumber from '@/hooks/useNumber.js'

	export default {
		setup() {
			// 使用计数器功能的完整模块
			let {
				number,
				increment,
				decrement
			} = useNumber();

			// 在模板中,使用这些模块
			return {
				number,
				increment,
				decrement
			}
		}
	}
</script>

<style>

</style>