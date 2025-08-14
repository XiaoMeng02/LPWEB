<template>
	<!-- 	当前用户名称{{username}}密码{{password}}
	books:{{books}} -->
	<!-- <about-view></about-view> -->
	<!-- <button @click="updata">添加书籍</button><br> -->
	<!-- 修改username<input type="text" v-model="username" /><br> -->
	<!-- 修改password<input type="text" v-model="password" /><br> -->
	<!-- <home-view></home-view> -->
	<slot-post>
		<!-- 在父组件中的代码,就在父组件中渲染 -->
		<!-- 所以这样的写法是可以的 -->
		<template #show>
			<h4>新闻列表</h4>
			<ul>
				<!-- 如果这里的for循环的渲染,是在子组件中完成的 -->
				<!-- 那么这里的渲染行为能成功吗?显然不行 -->
				<li v-for="(item,index) in news" :key="index">
					新闻标题:{{item.title}}
				</li>
			</ul>
			<!-- 可能会觉得,这样写也很好,因为数据不需要传递,可以直接使用渲染,看上去非常方便 -->
			<!-- 但是,要考虑到一个问题,我们使用组件的目的本身是为了复用代码,如果这样使用,这个代码能够复用吗? -->
			<!-- 很显然,这个代码无法复用,因为代码中有固定的值,有固定的属性 -->
		</template>
	</slot-post>


	<!-- 使用作用域插槽 -->
	<!-- 父组件提供样式和结构，子组件提供数据。这个是最理想的状态 -->
	<!-- 1-把需要的值传入 -->
	<for-slot :newlist="news">
		<!-- 把组件放到循环中 -->
		<template #default="unit">
			<!-- unit是包含了从子组件中传入的所有值的一个对象 -->
			<p><b>新闻标题:{{unit.item.title}}</b></p>
		</template>
	</for-slot>
</template>

<script>
	import {
		computed
	} from "vue";
	// import AboutView from "@/views/AboutView.vue";
	// import HomeView from "@/views/HomeView.vue";
	import SlotPost from "@/components/SlotPost.vue";
	import ForSlot from "@/components/ForSlot.vue";

	export default {
		name: 'App',
		data() {
			return {
				books: [{
						id: 1,
						bookName: '天龙八部'
					},
					{
						id: 2,
						bookName: 'CSS'
					}
				],
				news: [{
						id: 1,
						title: '美好的一天'
					},
					{
						id: 2,
						title: '幸福的一天'
					}
				],
				username: 'guoguo',
				password: '123456',
			}
		},
		components: {
			// AboutView,
			// HomeView,
			SlotPost,
			ForSlot
		},
		// 使用provide函数进行传值
		// 这里，将值传递出去以后，就不需要管这个值会被谁使用了
		// 父组件不关心这个值被谁使用，子组件也不关心这个值来自于哪里
		provide() {
			// 使用return 将需要传递的值进行返回
			// 使用同样的名称，起名称
			return {
				// 在父组件中，这个值是能够被修改的
				// 并且修改会影响到子组件的显示
				books: this.books,
				news: this.news,
				// 当父组件修改值的时候，有的值会让注入的内容一起改变，有的值不会
				// 决定这个值会不会跟随父组件值的修改而修改的条件是，这个值是否是复杂类型
				// 复杂类型的注入行为，和赋值类似，都是给地址
				//简单类型也是同样的情况，这里的注入相当于是将一个副本给了子组件
				username: this.username,
				// 因此复杂类型会被修改，简单类型不会
				// 为了让简单类型的值同样发生变化
				// 我们需要使用计算方法
				password: computed(() => {
					// 当使用这个计算方法以后，这里的赋值行为不再是通过简单的变量保存实现的，而是通过计算方法实现的，
					// 这个计算函数，会观察password值是否有发生变化，如果有，这个函数会及时更新
					// 又因为这个计算属性的值，是一个复杂类型，不再是简单类型，所以值的变化影响到子组件
					return this.password
				})
			}
		},
		methods: {
			updata() {
				this.books.push({
					id: 100,
					bookName: "vue3源码解析",
				});
			}
		},
	}
</script>

<style>

</style>