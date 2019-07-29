import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import files from './flieList'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...user.state,
    ...files.state
  },
  mutations: {
    ...user.mutations,
    ...files.mutations
  },
  getters: {
    user: state => state.user,
    fileList: state => state.flieList,
    len: state => state.len
  }
})

export default store
