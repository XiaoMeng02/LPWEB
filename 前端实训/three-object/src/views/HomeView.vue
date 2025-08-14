<template>
	<div class="home">
		<h1>This is an home page</h1>
		<!-- 使用组件的时候，没有给插槽的元素，插槽不会显示也不会报错 -->
		<my-component>
			<!-- 这里是空的 -->
		</my-component>
		<!-- 将插槽的值给组件 -->
		<my-component>
			<!-- 提供一个值给插槽 -->
			<p>这是插入插槽的组件</p>
		</my-component>
		<!-- 根据需求的不同，给与不同的插槽元素 -->
		<my-component>
			<!-- 而且元素可以给多个，没有数量限制 -->
			<button>这是一个按钮1</button>
			<button>这是一个按钮2</button>
		</my-component>
		<!-- <hello-world></hello-world> -->
	</div>


	<!-- 1 提供给插槽的值，写在父组件中的哪里？ -->
	<!-- 2 如果缺少提供给插槽的元素，会怎么显示？ -->
	<!-- 3 如果组件中，需要有多个插槽，如何解决？ -->
</template>

<script>
	// import HelloWorld from "@/components/HelloWorld.vue";
	import MyComponent from "@/components/MyComponent.vue"

	export default {
		name: 'HomeView',
		components: {
			// HelloWorld,
			MyComponent
		}
	}
</script>