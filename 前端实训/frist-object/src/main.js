// 项目的入口文件 整个项目的运行的起点
// 导入了vue中创建vue对象的方法
import {
	createApp
} from 'vue'
// 开始页面内容的模板组件
import App from './App.vue'
// 导入了路由文件
// import router from './router'

// 创建vue的app对象
let app = createApp(App);

// 将路由中间件绑定到app上
// app.use(router);

// 在入口文件中,注册全局组件
// 注册全局组件,需要两个参数
// 组件的名称,必须要是驼峰命名法,eslint约束的
import CategoryView from "@/components/CategoryView.vue"
// 将组件挂载到app上
app.component("CategoryView", CategoryView)


// 将vue对象挂载到id为app的元素上
app.mount('#app');