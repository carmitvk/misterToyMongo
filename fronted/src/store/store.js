import Vue from 'vue'
import Vuex from 'vuex'

import {toyStore} from './toyStore.js'
import {reviewStore} from './reviewStore.js'
import {userStore} from './userStore.js'
import {chatStore} from './chatStore.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    toyStore,
    reviewStore,
    userStore,
    chatStore
  }
})
