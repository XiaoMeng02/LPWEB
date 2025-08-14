<template>
	<div>
		<ul>
			<li v-for="(user,index) in users" :key="index">
				<!-- 使用ref这个属性,标记了这个元素 -->
				<input v-if="currentId == user.id" type="text" v-model="user.name" :ref="'input_' + user.id">
				<span v-else>{{user.name}} </span>
				<!-- 当点击事件的时候,将id值传递给函数 -->
				<button @click="edit(user.id)">编辑</button>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				users: [{
						id: 1,
						name: '张三'
					},
					{
						id: 2,
						name: '李四'
					},
					{
						id: 3,
						name: '王五'
					}
				],
				currentId: 0
			}
		},
		methods: {
			edit(id) {
				// 这一步是为了设置被选中的节点,切换显示
				this.currentId = id;
				// 这里的赋值行为,并不会使得vue立刻更新dom元素

				// 这个时候页面上自然没有这个input元素
				// 拼接当前的 DOM 节点
				// let inputId = 'input_' + id;
				// // 获取当前的dom节点并设置焦点。
				// this.$refs[inputId][0].focus();

				// 既然获取失败的原因，是因为执行顺序
				// 那么，我们也可以使用异步方法完成同样的效果
				setTimeout(() => {
					let inputId = 'input_' + id;
					this.$refs[inputId][0].focus();
				}, 0)

				// （同步）修改currentId 值->
				// （异步）页面重新渲染(ref重新生成)->
				// （异步）edit方法获取所有的ref元素

				// 第二种解决方法

				// 获取到当前的 DOM 节点
				let inputId = 'input_' + id;

				// 基于事件实现
				// 这个函数，会当下一次dom更新以后执行
				// 这个方法类似于钩子函数，当什么什么条件满足的时候执行，这个函数的执行时机是，当下一次dom更新
				this.$nextTick(function() {
					this.$refs[inputId][0].focus();
				});
			}
		}
	}
</script>

<style>

</style>