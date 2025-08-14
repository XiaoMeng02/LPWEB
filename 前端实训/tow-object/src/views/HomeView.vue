<template>
	输入的内容: <input type="text" v-model="message" /><br>
	<button @click="sendMsg">发送</button>
</template>

<script>
	// 从vue中导入inject函数函数 使用inject方法拿出保存的值
	import {
		inject
	} from 'vue';

	export default {
		name: 'HomeView',
		data() {
			return {
				message: "",
				emitter: null,
			}
		},
		methods: {
			sendMsg() {
				// 总线结构的插件 数据发送方
				// main.js中绑定了这个中间件 可以通过这个方法，获取总线的事件对象
				// 调用总线的事件方法，
				this.emitter.emit("myevent", this.message);
				// 用法和子传父类似
				// this.$emit("myevent", this.message);
			}
		},
		created() {
			// 等加载完成后，将值保存
			// 如果不等vue加载完成，就使用inject方法导入
			// 得到的只能是undefind
			this.emitter = inject("emitter");
		}
	}
</script>