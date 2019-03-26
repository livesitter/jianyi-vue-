import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import user from './module/user'
import mutations from './mutations'
import saveToLocal from './plugin/saveToLocal'



Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user
  },
  plugins: [saveToLocal]
})
