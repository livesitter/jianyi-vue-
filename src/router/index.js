import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes
})


//　变量表示是否已登录
const HAS_LOGINED = true;

// 全局拦截
router.beforeEach((to,from,next)=>{
  if(to.name !== 'login'){
    if(HAS_LOGINED) next()
    else next({ name: 'login' })
  }
  else{
    if(HAS_LOGINED) next({ name: 'home' })
    else next()
  }

})

export default router
