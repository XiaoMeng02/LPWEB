<template>
	<div class="app">
		<h2>求和为：{{sum}}</h2>
		<h2>名字为：{{person.name}}</h2>
		<h2>年龄为：{{person.age}}</h2>
		<h2>汽车品牌：{{car.barnd}}</h2>
		<h2>汽车颜色：{{car.options.color}}</h2>
		<h2>汽车引擎：{{car.options.engine}}</h2>
		<button @click="changeSum">sum++</button>
		<button @click="changeName">修改名字</button>
		<button @click="changeAge">修改年龄</button>
		<button @click="changePerson">修改整改人</button>
		<span>|</span>
		<button @click="changeBrand">修改品牌</button>
		<button @click="changeColor">修改颜色</button>
		<button @click="changeEngine">修改发动机</button>

	</div>
	
</template>

<script setup lang="ts" name="App">
	import { ref,shallowRef,shallowReactive, reactive} from 'vue'
	
	// let sum = ref(0) 
	// let person = ref({
	// 	name: 'John',
	// 	age: 18
	// })

	//shallowRef只关注整体，不关注内部的变化
	let sum = shallowRef(0) 
	let person = shallowRef({
		name: 'John',
		age: 18
	})

	let car = shallowReactive({
		barnd:'奔驰',
		options: {
			color: '红色',
			engine: 'V8'
		}
	})

	function changeSum() {
		sum.value += 1
	}

	function changeName() {		
		person.value.name = 'Mike'
	}

	function changeAge() {
		person.value.age += 1
	}

	function changePerson() {
		person.value = {name: 'Tom',age: 25}
	}
	function changeBrand() {
		car.barnd = '宝马'
	}
	function changeColor() {
		car.options.color = '蓝色'
	}
	function changeEngine() {
		car.options.engine = 'V12'
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