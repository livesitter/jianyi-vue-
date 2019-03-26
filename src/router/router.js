import Home from '@/views/Home.vue'

export default[
  {
    path : '/',
    name: 'home',
    component : Home,
    // 路由传参——函数模式
    props: (route) => ({
      food: route.query.food
    })
  },
  {
    path : '/about',
    name: 'about',
    // 懒加载组件
    component : () => import (/* webpackChunkName: "about" */
    '@/views/About.vue'),
    // 路由传参对象模式,可以精准传参
    props : {
      food: 'banana'
    }
  },
  {
    path : '/video/:name',
    name: 'video',
    // 懒加载组件
    component : () => import ('@/views/Video.vue'),
    // 启用路由传参，地址最后的参数被解析为组件属性，适合单个动态属性
    props: true
  },
  {
    path : '/parent',
    name: 'parent',
    // 懒加载组件
    component : () => import ('@/views/Parent.vue'),
    // 子路由
    children: [
      {
        path: 'child',
        component : () => import ('@/views/Child.vue'),
      }
    ]
  },
  {
    path : '/main',
    // 重定向
    redirect: {
      name: 'home'
    }
  },
  {
    path : '/login',
    name: 'login',
    // 懒加载组件
    component : () => import ('@/views/Login.vue'),
  },
  {
    path : '/store',
    name: 'store',
    // 懒加载组件
    component : () => import ('@/views/Store.vue'),
  },
  {
    path : '/render_page',
    name: 'render_page',
    // 懒加载组件
    component : () => import ('@/views/RenderPage.vue'),
  },
  // 揽底路由，404页面
  {
    path : '*',
    // 懒加载组件
    component : () => import ('@/views/Error.vue'),
  },
]
