import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import 'reset.css'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

Vue.use(elementUi)
Vue.use(VueLazyLoad)
Vue.prototype.$axios=axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
