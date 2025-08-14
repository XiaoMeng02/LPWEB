import {
	createApp
} from 'vue'
import App from './App.vue'

// 定义好的路由对象，需要通过中间件的方法，加入到vue对象中去
import router from './router'

// 将定义好的路由插件，放入vue对象中
createApp(App).use(router).mount('#app')