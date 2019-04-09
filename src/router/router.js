import Home from '@/views/Home.vue'
import Layout from '@/views/Layout.vue'


export default[
  {
    path : '/',
    name: 'home',
    component : Layout,
    children:[
        {
          path: 'home',
          component : Home,
        },
        {
          path: 'detail',
          name: 'detail',
          // 懒加载组件
          component : () => import ('@/views/Detail.vue'),
        },
    ],
    // 重定向
    redirect: '/home'
  },
  // 移动端提醒页面
  {
    path : '/tips',
    name: 'tips',
    // 懒加载组件
    component : () => import ('@/views/Tips.vue'),
  },
  // 揽底路由，404页面
  {
    path : '*',
    // 懒加载组件
    component : () => import ('@/views/Error.vue'),
  },
]
