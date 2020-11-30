import Vue from 'vue'
import Vuex from 'vuex'
import family from './modules/family'
import alert from './modules/global/alert'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    family,
    alert
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
