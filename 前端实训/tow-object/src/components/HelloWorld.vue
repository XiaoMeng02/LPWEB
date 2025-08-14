<template>
	<!-- 循环打印了数据 -->
	<div>
		<ul>
			<li v-for="(user,index) in users" v-bind:key="index">
				<!-- 使用input标签名称和id值,生成了一个唯一id -->
				<!-- 这个id保存在ref中,vue中可以使用这个id,获取这个元素 -->
				<input v-if="currentId == user.id" type="text" v-model="user.name" :ref="'input_' + user.id">
				<span v-else>{{user.name}} </span>
				<!-- 编辑事件 -->
				<!-- 实现点击输入框后,立马获取输入框焦点 -->
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
				this.currentId = id;

				// 使用ref绑定的值,获取元素
				// 拼接当前需要获取到的 DOM 节点
				let inputId = 'input_' + id;

				// 获取当前的input的dom节点并设置焦点。
				// 这里立马就会报错,因为这里其实获取不到元素
				// this.$refs[inputId][0].focus();

				// 为什么会获取失败?因为这个代码预想的执行顺序如下
				// 1-点击编辑按钮
				// 2-input标签出现
				// 3-函数触发,获取input标签
				// 4-触发焦点事件
				// 真实的触发顺序如下
				// 1-点击编辑按钮
				// 2-函数触发,获取input标签
				// 3-页面上旧的dom中,没有input,获取失败
				// 4-试图使用这个不存在的元素,报错

				// 解决方法1
				// 既然是因为,在获取的时候,页面还没有加载,所以报错的
				// 那么是不是可以把获取的行为延后?让元素能被获取到?
				// setTimeout(() => {
				// 	this.$refs[inputId][0].focus();
				// }, 10)


				// 解决方法2
				// 既然是因为,我们获取到的是旧的dom,所以无法执行
				// 那么我们是否可以将获取的行为延后到新dom渲染后执行?
				// 旧dom -> 获取旧dom元素 -> 新dom渲染
				this.$nextTick(() => {
					//等新的dom渲染完成后,再获取元素
					this.$refs[inputId][0].focus();
				});
			}
		}
	}
</script>

<style>

</style>