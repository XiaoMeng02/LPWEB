<template>
	<div class="about">
		<h1>This is an about page</h1>
		<!-- 具名插槽（命名插槽）的使用 -->
		<my-slot>
			<!-- 由于插槽往往要插入的不止一个元素 -->
			<!-- 所以会使用组件模板的标签 去包裹内容 -->
			<template v-slot:from>
				username<input type="text" /><br>
				password<input type="text" /><br>
			</template>
			<!-- 这里是vue解析的指令,所以不是给参数 -->
			<template v-slot:btn>
				<button type="button">登陆</button>
			</template>
		</my-slot>

		<!-- 没有插入值 -->
		<my-slot>
			<!-- 没有插入值(缺少) -->
			<!-- 当缺少的时候,和默认插槽一样,不会报错,而是直接不显示 -->
			<template v-slot:btn>
				<button type="button">登陆</button>
			</template>
		</my-slot>
		<!-- 插入值时,绑定错了 -->
		<my-slot>
			<!-- 绑定错的情况下,vue不会报错,所以需要格外的小心 -->
			<template v-slot:inputs>
				<p>inputs插槽</p>
			</template>
		</my-slot>

		<!-- 使用缩写的写法,完成具名插槽 缩写为# -->
		<my-slot>
			<template #from>
				username<input type="text" /><br>
				password1<input type="text" /><br>
				password2<input type="text" /><br>
			</template>
			<template #btn>
				<button type="button">注册</button>
			</template>
		</my-slot>

		<!-- 有时候我们需要根据情况,切换插槽的内容 -->
		<!-- 动态绑定的值,是保存在vue的data中的值 -->
		<my-slot>
			<!-- 通过一个变量值,来决定这个模板,插入到那个命名插槽中 -->
			<template #[slotName]>
				<h2>我是动态插槽</h2>
			</template>
		</my-slot>


		<!-- 修改 slotName 值的输入框-->
		<br>
		修改 slotName<input type="text" v-model="slotName" />
	</div>
</template>

<script>
	import MySlot from "@/components/MySlot.vue"

	export default {
		name: 'AboutView',
		data() {
			return {
				slotName: "from"
			}
		},
		components: {
			MySlot
		}
	}
</script>