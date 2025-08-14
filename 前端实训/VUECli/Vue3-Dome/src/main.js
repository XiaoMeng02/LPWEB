import './assets/main.css'
//new Vue() 创建一个应用实例 => createApp()
//createRouter() createStore()
//将创建实例进行封装，保证每个实例的独立封装性
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
//mount() 设置挂载点 #app(id为app的盒子)
app.mount('#app')
