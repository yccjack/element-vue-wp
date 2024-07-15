import {createApp, ref} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import router from "@/routes";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Axios from "axios";
import Global from "@/components/common/global";
import "@/components/common/globalcss.css";
import {getObjectClass, baseUrl} from "@/components/common/global";

const app = createApp(App).use(router).use(ElementPlus)

app.mount('#app')


Axios.defaults.baseURL = 'http://localhost:8082/blog/';
// Axios.defaults.baseURL = 'http:///42.192.209.81:9991/';
app.config.globalProperties.$uploadUrl = ref('http://42.192.209.81:9991/upload')
// Axios.defaults.baseURL = 'http://localhost:5000/';
// app.config.globalProperties.$uploadUrl = ref('http://192.168.1.5:9991/upload')
app.config.globalProperties.$http = Axios
app.config.globalProperties.$Global = Global
app.config.globalProperties.$getObjectClass = getObjectClass

for (const [key, value] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, value)
}

let user_info = localStorage.getItem("userInfo");

if (user_info !== null && user_info !== undefined && user_info !== '') {
    Global.user = JSON.parse(user_info)
    Global.user_id = Global.user.id
    Global.login = true
    Axios.defaults.headers.common['user_id'] = Global.user_id
}


// 解决ERROR ResizeObserver loop completed with undelivered notifications.

//问题的

const debounce = (fn, delay) => {
    let timer = null;

    return function () {
        let context = this;

        let args = arguments;

        clearTimeout(timer);

        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
};

const _ResizeObserver = window.ResizeObserver;

window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
    }
};



