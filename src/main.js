import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import router from "@/routes";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios";
const app = createApp(App).use(router).use(ElementPlus)

app.mount('#app')

axios.defaults.baseURL = 'http://localhost:5000';
for (const [key, value] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, value)
}