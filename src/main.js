import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import router from "@/routes";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Emitter from 'tiny-emitter'

const emitter = new Emitter()

const app = createApp(App).use(router).use(ElementPlus)
// 绑定为全局可用
app.config.globalProperties.emitter = emitter
app.mount('#app')
for (const [key, value] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, value)
}