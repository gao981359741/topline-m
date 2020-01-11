import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')// 按需加载
  }, {
    path: '/',
    name: 'tab-bar',
    component: () => import('@/views/tab-bar'), // 按需加载
    // 子路由
    children: [
      {
        path: '', // 默认配置子路由
        name: 'home',
        component: () => import('@/views/home')
      }, {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }, {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      }, {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      }
    ]
  }, {
    path: '/user/:userId', // id是动态的所以:userId
    name: 'user',
    component: () => import('@/views/user')
  }
]

const router = new VueRouter({
  routes
})

export default router
