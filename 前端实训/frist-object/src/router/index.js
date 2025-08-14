import {
	createRouter,
	createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 路由 判断用户进入到那个页面
// 由于vuecli是一个单页面的应用,所以用户的跳转页面的请求,
// 不需要向服务器请求加载页面,而是在访问第一个页面的时候,就将所有的视图,所有的组件加载好了
// 页面跳转的行为由前端路由进行,而不是后端路由进行
const routes = [{
		// 请求的路径
		path: '/',
		// 请求的名称
		name: 'home',
		// 请求的视图
		component: HomeView
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('../views/AboutView.vue')
	}
]

// 设置路由解析的方式
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router