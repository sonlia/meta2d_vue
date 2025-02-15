import { createApp,defineCustomElement } from 'vue'
import ElementPlus from 'element-plus' // 导入UI组件库
import 'element-plus/dist/index.css' // 导入依赖css文件
import router from "./router.js"
// import App from './App.vue'
import  mainroute from "./mainroute.vue"
import axios from 'axios'; // 引入 Axios
const app = createApp(mainroute)
app.use(ElementPlus) // 全局安装ElementPlus
app.use(router)
// 添加路由守卫：认证跳转逻辑
router.beforeEach((to, from, next) => {
    const isAuthenticated = document.cookie.includes('authToken=true'); // 检查 Cookie
   console.log(isAuthenticated,"fefe")
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login'); // 如果需要认证但未登录，重定向到登录页
    } else {
      next(); // 否则继续导航
    }
  });
  

  // 配置 Axios 请求拦截器
// axios.defaults.baseURL = '/api'; // 设置基础 URL
axios.interceptors.response.use(
    response => response, // 成功响应直接返回
    error => {
        if (error.response && error.response.status === 401) {
            // 捕获 401 状态码，跳转到登录页面
            const redirectPath = error.response.data.redirect || '/login';
            router.push(redirectPath);
        }
        return Promise.reject(error); // 返回错误以便后续处理
    }
);
app.mount('#app')
 