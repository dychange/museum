import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import user from './modules/user'
import getters from './getter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user
  },
  actions,
  getters
})