<template>
	<div class="app">
		<h2>求sum1为：{{ sum1 }}</h2>
		<h2>求sum2为：{{ sum2 }}</h2>
		<h2>当前汽车为：{{ car1 }}</h2>
		<h2>当前汽车为：{{ car2 }}</h2>
		<button @click="changeSum1">sum1++</button>
		<button @click="changeSum2">sum2++</button>
		<span>|</span>
		<!-- <button @click="changeBrand">修改品牌(1)</button>
		<button @click="changeColor">修改颜色(1)</button>
		<button @click="changeEngine">修改发动机(1)</button> -->
		<button @click="changeBrand2">修改品牌(2)</button>
		<button @click="changeColor2">修改颜色(2)</button>
		<button @click="changeEngine2">修改发动机(2)</button>
	</div>

</template>

<script setup lang="ts" name="App">
	//shallowReadonly 只读的浅层对象，不会深入其内部属性
	import { ref, reactive, readonly, shallowReadonly } from 'vue'

	let sum1 = ref(0)
	let sum2 = readonly(sum1)
	let car1 = reactive({
		brand: '奔驰',
		options: {
			color: '红色',
			price: 100000
		}
	})
	let car2 = shallowReadonly(car1)

	function changeSum1() {
		sum1.value += 1
	}

	function changeSum2() {
		sum2.value += 1// 不能修改sum2的值，只能修改sum1的值
	}
	function changeBrand() {
		car1.brand = '宝马'
	}
	function changeColor() {
		car1.options.color = '蓝色'
	}
	function changeEngine() {
		car1.options.price += 10
	}
	function changeBrand2() {
		car2.brand = '宝马'
	}
	function changeColor2() {
		car2.options.color = '蓝色'
	}
	function changeEngine2() {
		car2.options.price += 10
	}
</script>

<style scoped>
.app {
	background-color: #ddd;
	border-radius: 10px;
	box-shadow: 0 0 10px;
	padding: 20px;
}

button {
	margin: 0 5px;
}
</style>