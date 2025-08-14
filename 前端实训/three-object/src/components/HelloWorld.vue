<template>
	<div class="hello">
		<button @click="addBook"> 添加书籍</button>
		<h1>子组件的子组件</h1>
		你好!用户{{username}}密码为{{password}}
		<h3>书本列表</h3>
		<ul>
			<!-- 循环书本对象 -->
			<li v-for="(unit,index) in books" :key="index">
				ID:{{unit.id}}书本名称:{{unit.bookName}}
			</li>
		</ul>
		<h3>新闻列表</h3>
		<ul>
			<!-- 循环新闻对象 -->
			<li v-for="(unit,index) in news" :key="index">
				ID:{{unit.id}}新闻标题:{{unit.title}}
			</li>
		</ul>


		<!-- 1是否可以修改注入的值？ -->
		<!-- 2修改注入值，是否会影响到父组件中的值？ -->
		<!-- 3父组件修改值，是否会影响到子组件的显示？ -->
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		// 这个过程，我们称之为注入数据
		// 注入books ， news 和username三个值
		inject: ["books", "news", "username", "password"],
		methods: {
			addBook() {
				// 这里的增加值的行为，也会影响到父组件
				// 复杂类型能够子组件影响到父组件，真的是一件好事吗？
				// 如果每个子组件都能修改父组件的值，那么父组件中保存的值发生错误，很难找到是哪一个子组件造成的影响 
				this.books.push({
					id: 200,
					bookName: "vue3的插件"
				});
				// 修改简单类型
				this.username = "小白"
			}
		},
	}
	
	//通过注入方法传值的总结
	//默认情况下，父子组件之间，复杂类型的注入，会互相影响
	// 简单类型的修改都不会互相影响 
</script>


<style scoped>

</style>