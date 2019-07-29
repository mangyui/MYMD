export default {
  state: {
    flieList: []
  },
  mutations: {
    addFlie (state, file) {
      let fe = {
        file: file,
        index: state.flieList.length,
        ischange: false
      }
      state.flieList.push(fe)
    },
    removeFile (state, index) {
      state.flieList.splice(index, 1)
    }
  }
}
