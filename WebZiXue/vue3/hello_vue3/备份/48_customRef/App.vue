<template>
	<div class="app">
		<h2>{{ msg }}</h2>
		<!-- v-model双向绑定 -->
		<input type="text" v-model="msg">
	</div>

</template>

<script setup lang="ts" name="App">
	import { ref } from "vue"
	import userMsgRef from "./userMsgRef"

// 使用Vue提供的默认的ref定义的响应式度据,数据一变化就更新
// const msg = ref('Hello Vue 3')

//使用{msg} = userMsgRef来定义一个响应式数据且有延迟效果
let {msg} = userMsgRef('Hello Vue 3', 2000)



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