import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {getUserInfoMessage} from '../utils/localStorage'
import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!getUserInfoMessage('userInfo') && to.path!=='/login'){
    Message.error('用户已过期,请重新登录')
    next('/login')
  }else{
    next()
  }
})

export default router