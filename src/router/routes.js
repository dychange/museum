import Home from '../views/Home.vue'

export default [
  {
    path:'/',
    redirect:'/index'
  },
    {
        path: '/index',
        name: 'home',
        component: Home,
        redirect:'/admininfo',
        children:[
          {
            path:'/editself',
            name:'EditSelf',
            component:() => import('../views/EditSelf.vue')
          },
          {
            path:'/editpass',
            name:'EditPass',
            component:() => import('../views/EditPass.vue')
          },
          {
            path:'/user',
            name:'User',
            component:() => import('../components/account/User.vue')
          },
          {
            path:'/admin',
            name:'Admin',
            component:() => import('../components/account/Admin.vue')
          },
          {
            path:'/type',
            name:'ItemType',
            component:() => import('../components/exhibits/ItemType.vue')
          },
          {
            path:'/item',
            name:'Item',
            component:() => import('../components/exhibits/Item.vue')
          },
          {
            path:'/leavemsg',
            name:'TouristMsg',
            component:() => import('../components/leavemsg/TouristMsg.vue')
          },
          {
            path:'/find',
            name:'Find',
            component:() => import('../components/notices/Find.vue')
          },
          {
            path:'/safenotice',
            name:'SafeNotice',
            component:() => import('../components/notices/SafeNotice.vue')
          },
          {
            path:'/lostandfound',
            name:'LostAndFound',
            component:() => import('../components/notices/LostAndFound.vue')
          },
          {
            path:'/feedback',
            name:'FeedBack',
            component:() => import('../components/feedback/FeedBack.vue')
          },
          {
            path:'/admininfo',
            name:'AdminInfo',
            component:() => import('../views/AdminInfo.vue'),
          }
        ]
      },
      {
        path:'/login',
        name:'Login',
        component:()=> import('../views/Login.vue')
      },
      {
        path:'/404',
        name:'NotFound',
        component:()=> import('../views/404.vue')
      },
      {
        path:'*',
        redirect:'/404'
      }
]