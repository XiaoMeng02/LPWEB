<template>
	<h1>这是路由页面</h1>
	<!-- 定义链接 效果类似于a标签,可以进行跳转 -->
	<!-- 事实上就是封装好的a标签,to代表的是其跳转的hash值 -->
	<router-link to="/login" replace>登陆</router-link>|
	<router-link to="/home" replace>首页</router-link>|
	<!-- 设置该访问不被记录 -->
	<router-link to="/about" replace>介绍</router-link>|
	<router-link to="/category" replace>分类</router-link>|
	<!-- 这个路径没有建立映射,自然无法显示内容 -->
	<router-link to="/cart" replace>购物车</router-link>|
	<router-link to="/Plist" replace>商品列表</router-link>|

	<!-- 然后,我们需要决定,内容在哪里显示 -->
	<!-- 定义路由组件显示的位置 -->
	<router-view></router-view>

	<!-- 这里完成路由效果,不需要本组件的js参与 -->
	<!-- 实现组件和js代码的分离 -->
</template>

<script setup>

</script>

<style>
	/* 设置当前选中的链接样式 */
	.router-link-active {
		color: white;
		background-color: black;
	}

	/* 如果想设置a标签的样式,直接设置即可 */
	a {
		display: inline-block;
		padding: 5px 10px;
		margin: 0px 10px;
		text-decoration: none;
		border: 1px solid black;
	}

	/* 有可能会试图去这样设置样式 */
	/* 选择页面上所有的router-link标签,设置样式 */
	/* 这个router-link标签,最终会被vue解析成另外一个标签,所以这样无法生效 */
	/* 以后遇到这种情况,如何给样式?这个时候就需要透过现象看本质,看看这个标签,在页面上最终会被解析成什么标签 */
	/* 	router-link {
		display: inline-block;
		padding: 5px 10px;
		margin: 0px 10px;
		text-decoration: none;
		border: 1px solid black;
	} */
</style>