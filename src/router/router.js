import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if(to.path==='/login'){
//     next()
//   }else{
//     alert('请登录在访问首页')
//     next('/login')
//   }
// })

export default router