import Vue from 'vue'
import Vuex from 'vuex'
import files from './fileList'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...files.state
  },
  mutations: {
    ...files.mutations
  },
  getters: {
    fileList: state => state.fileList,
    len: state => state.len
  }
})

export default store
