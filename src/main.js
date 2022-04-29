import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import router from "@/routes";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App).use(router).use(ElementPlus)
app.mount('#app')
for ([key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}