import {
	createRouter,
	createWebHistory
} from 'vue-router'
import loginView from '../views/loginView.vue'

const routes = [{
	path: '/',
	name: 'login',
	component: loginView,
	meta: {
		isAuth: false
	}
}, {
	path: '/register',
	name: 'register',
	component: () => import('../views/registerView.vue'),
	meta: {
		isAuth: false
	}
}, {
	path: '/home',
	name: 'home',
	component: () => import('../views/HomeView.vue'),
	meta: {
		isAuth: true
	}
}, {
	// 传参的方法
	path: '/details/:priceId',
	name: 'details',
	component: () => import('../views/detailsView.vue'),
	meta: {
		isAuth: true
	},
	props: true
},{
	path: '/cart',
	name: 'cart',
	component: () => import('../views/cartView.vue'),
	meta: {
		isAuth: false
	}
}, ]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})


// 鉴权操作 当没有登陆的情况下，这个网站不允许访问其功能页面
// 鉴权操作
router.beforeEach(async (to) => {
	// 1. 获取用户登录状态
	const userModule = await import("@/store/user");
	const user = userModule.default();
	const isLogin = !!user.userMessage; // 是否已登录

	// 2. 定义登录后禁止访问的页面（登录页/注册页）
	const forbiddenAfterLogin = ['login', 'register'];

	// 3. 登录后访问禁止页面：重定向到首页
	if (isLogin && forbiddenAfterLogin.includes(to.name)) {
		return '/home';
	}

	// 4. 未登录访问需授权页面：重定向到登录页
	if (!isLogin && to.meta.isAuth) {
		return '/';
	}

	// 5. 其他情况允许访问
	return undefined;
});

export default router