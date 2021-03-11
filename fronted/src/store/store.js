import Vue from 'vue'
import Vuex from 'vuex'

import {toyStore} from './toyStore.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:17
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    toyStore,
  }
})
