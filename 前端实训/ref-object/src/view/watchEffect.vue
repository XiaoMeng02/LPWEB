<template>
	<div id="box">
		<h1>这个是侦听方法的组件</h1>
		<p>名字叫做: {{fristname+lastname}}</p>
		fristname<input type="text" v-model="fristname" /><br>
		lastname<input type="text" v-model="lastname" /><br>
		age <input type="number" v-model="age" />

		<!-- 调用侦听器返回的函数,就可以停止侦听 -->
		<button @click="stopwatch()">停止侦听</button>
	</div>
</template>

<script>
	import {
		ref,
		watchEffect
	} from 'vue'
	export default {
		setup() {
			// 创建一个响应式的数据
			let fristname = ref("张");
			let lastname = ref("四");
			// 假如有个值,不参与输出,是否会被收集依赖
			let age = ref(0);


			// 这个监听方法，不需要传入监听的对象
			// 因为该函数中所有的计算变量，都是被监听的对象
			// 当其中一个发生变化,函数重新执行
			// 这个侦听方法会返回一个函数,如果不需要继续侦听
			// 调用这个函数即可
			let stopwatch = watchEffect(() => {
				console.log("该用户的名称为:" + fristname.value + lastname.value);
				// 这里没有使用age这个值完成任何事情
				// 但是这个值依然被视为了依赖的一部分
				// 当我们修改这个值的时候,函数也会刷新
				age.value;
			});


			return {
				fristname,
				lastname,
				age,
				stopwatch
			}
		}
	}
</script>

<style>
</style>