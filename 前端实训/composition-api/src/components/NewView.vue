<template>
	<p>这个子组件使用的是选项式api</p>
	<!-- 初始化的时候确实用到了这个值和函数 -->
	<!-- <p>保存在setup中的文本: {{str}}</p> -->
	<p>当前数值为:{{num}}{{bool}}</p>
	<button @click="add()">增加值</button>
	<p>对象中的值:{{user.username}}</p>
	<p>单独的username值:{{username}}</p>
	<button @click="updata()">修改值</button>
</template>

<script>
	// 想使用vue的函数，需要从vue对象中导入
	import {
		ref, //用来实现简单类型的响应式
		reactive, //用来实现复杂类型的响应式
		toRefs //vue提供的解构方法
	} from 'vue';
	export default {
		name: "NewView",
		setup() {
			// 直接把这个setup当作函数使用
			// 定义值 这个值不会被监听，因为如果
			// 每一个值都被监听，那么整个代码中大量的不需要监听的数据，都会被监听起来造成浪费
			// 使用vue的ref方法，指定这个值需要被监听变化
			let num = ref(100);
			// 我们现在可以决定那些值需要被监听，那些值不需要
			// let str = "这是一顿文本";
			// 使用箭头函数，定义累增方法
			let add = () => {
				// 监听的变量，需要使用值的话，要加上.value
				// 因为num不再是一个简单的数字类型了，所以从中取值需要通过.的方式
				num.value++;
				console.log("值变化了吗？", num);
			}

			// 如果需要实现数据响应式的，不是一个简单的值，而是一个复杂类型，ref还可以完成吗？
			let user = reactive({
				username: "xiaoli",
				password: "123456",
				age: "18"
			});

			// 如果我们试图解构一个响应式的对象类型
			// 这个时候代码就会报错
			// let {
			// 	username,
			// 	password,
			// 	age
			// } = user;
			// 这样解构响应式的对象，可以解构，但是得到的值，不是响应式的
			// 使用vue提供的方法，进行数据的解构
			// 解构出来，依然有响应式的效果，但是这里解构出来的值，是否和原本的对象中的值还有关系？
			// 事实上，对象中的值的修改，会影响到解构出来的值
			// 解构出来的值，不会影响到对象中的值
			let {
				username,
				password,
				age
			} = toRefs(user);
			console.log("解构得到值:", username, password, age);


			// ref可以实现复杂类型和简单类型的响应式
			// reactive可以实现简单类型的响应式吗？
			// 不可以，因为reactive只接受复杂类型的数据
			let bool = reactive(false);

			// 修改对象中的值的方法
			let updata = () => {
				// 和ref不同，使用reactive实现的数据响应式，不需要通过.value的方式访问
				user.username = "小王"
				// username = "小李"
				console.log("更新后的结果为:", user);
			}


			// 将定义好的值，和函数返回
			// 如果一个值或者一个函数，需要在组件中使用
			// 那么必须要返回
			return {
				num,
				add,
				user,
				updata,
				bool,
				username
			}
		}
	}
</script>

<style>
</style>