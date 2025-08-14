import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// 导入 Element Plus
import ElementPlus from 'element-plus'
// 导入 Element Plus 样式
import 'element-plus/dist/index.css'
// 如果需要中文显示，导入中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

// 导入了所有的小图标，并且注册成全局组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 循环注册全局图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}


// 使用 Element Plus，并配置语言
app.use(ElementPlus, {
	locale: zhCn
})
app.use(router);
app.use(store);

// 挂载到元素上
app.mount('#app')