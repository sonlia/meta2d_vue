// router.js
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'; // 根组件
import Login from './components/Login.vue'; // 登录页面

// 定义路由规则
const routes = [
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false } // 登录页不需要认证
  },
  {
    path: '/',
    component: App,
    meta: { requiresAuth: true } // 主页需要认证
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;