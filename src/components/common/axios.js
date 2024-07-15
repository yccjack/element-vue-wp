// src/axios.js
import axios from 'axios';

// 创建一个Axios实例
const instance = axios.create({
    baseURL: 'http://localhost:8082/blog/', // 你的API基础URL
    // Axios.defaults.baseURL = 'http:///42.192.209.81:9991/';
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 可以在这里添加请求头或者其他请求配置
        console.log('请求拦截器', config);
        return config;
    },
    error => {
        // 处理请求错误
        console.error('请求错误', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 处理响应数据
        console.log('响应拦截器', response);
        return response;
    },
    error => {
        // 处理响应错误
        console.error('响应错误', error);
        if (error.response) {
            // 服务器返回的状态码不是2xx
            console.error('错误状态码', error.response.status);
            console.error('错误信息', error.response.data);
        } else {
            // 请求没有收到响应或者其他错误
            console.error('请求错误信息', error.message);
        }
        return "";
    }
);

export default instance;
