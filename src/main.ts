import { createApp } from 'vue'
import GlobalComponents from './plugins'
import './style.css'
import App from './App.vue'
import 'virtual:svg-icons-register'


// const app = createApp(App)

// 全局注册组件
createApp(App).use(GlobalComponents).mount('#app')
