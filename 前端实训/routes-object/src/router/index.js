// vuecli中，常见的使用插件的做法
// 是将插件名称，作为文件夹名称，创建文件夹，然后创建一个index.js的入口文件

// 1-从插件中导入创建功能，所需要使用的方法
import {
	createRouter,
	createWebHashHistory,
	// H5的history方法
	// createWebHistory
} from 'vue-router'

// 将需要映射的组件文件，导入
// 不是随便什么文件，都需要导入进来，因为只有页面一级的组件
// 需要使用路由切换,页面中一些按钮组件,一些样式组件,依附于页面组件
// 它们不需要通过路由切换
import AboutView from "@/views/AboutView.vue"
import CategoryView from "@/views/CategoryView.vue"
import HomeView from "@/views/HomeView.vue"
import loginView from "@/views/loginView.vue"
import NotFound from "@/views/NotFound.vue"

// 这些页面级别的组件,在使用单页面应用之前,都是独立的功能页面




// 定义路由的规则
// 将路由和页面或者组件对应的过程，我们称之为映射
const routes = [{
		// 在这里,通过添加映射的方式,实现一个组件对应多个请求路径
		// 但是一般不会反过来,一个路径对应多个组件
		// 实现默认显示某个组件的效果
		path: "/",
		component: HomeView,
	},
	{
		path: "/index",
		component: HomeView,
	}, {
		// 路径
		path: "/home",
		// 路径对应的组件
		component: HomeView,
		// 建立完联系后,这个被称之为路由
	}, {
		path: "/about",
		component: AboutView,
	}, {
		path: "/category",
		component: CategoryView,
	},
	{
		path: "/login",
		component: loginView,
	},
	// 面对用户有可能进行的空访问,我们进行冗余处理
	// 当页面不存在的时候,重定向到404页面中
	// 这个相当于ifelse中的else 或者switch中默认值
	{
		path: '/:pathMatch(.*)',
		component: NotFound,
	},
]


// 2-使用导出的方法创建路由
const router = createRouter({
	// 设置路由模式为哈希路由 	
	history: createWebHashHistory(),
	// 设置路由规则，路由规则是一个数组类型
	routes
})


// 3-将创建好的路由对象，导出（暴露）
export default router;