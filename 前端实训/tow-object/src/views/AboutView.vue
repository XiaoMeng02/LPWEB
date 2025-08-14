<template>
	<h1>组件发送的信息为:{{message}}</h1>
</template>

<script>
	import {
		inject
	} from 'vue';

	export default {
		name: "AboutView",
		data() {
			return {
				message: "",
			}
		},
		// 使用钩子函数，当vue对象创建完成后，去绑定响应事件
		created() {
			// 绑定一个触发事件，通过相同的事件名称，确定谁传给谁
			// 通过inject，导入总线对象
			// 导出总线对象
			const emitter = inject("emitter");
			// 触发以后，通过函数获取传过来的值
			emitter.on("myevent", (value) => {
				console.log("传过来的信息为", value);
				this.message = value;
			})
		}
	}
</script>