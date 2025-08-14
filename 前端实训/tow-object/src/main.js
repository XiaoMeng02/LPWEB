import {
	createApp
} from 'vue'
import App from './App.vue'
// vue的路由库
import router from './router'

let app = createApp(App);

// 将第三方的路由插件进行绑定(也叫中间件)
app.use(router);

// 将总线插件绑定在vue对象上
// 这里导入的方法，不需要去特地在modules文件夹中去找这个插件
import mitt from 'mitt';
// eslint 会规范你的使用，如果一个插件导入了但没有使用，那么也会报错
const emitter = mitt();
// 绑定了中间件 保存了emitter对象在vue中
app.provide('emitter', emitter);

app.mount('#app')