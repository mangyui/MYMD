import Vue from 'vue'
import Vuex from 'vuex'
import files from './flieList'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...files.state
  },
  mutations: {
    ...files.mutations
  },
  getters: {
    fileList: state => state.flieList,
    len: state => state.len
  }
})

export default store
