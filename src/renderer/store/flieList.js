export default {
  state: {
    flieList: JSON.parse(sessionStorage.getItem('flieList')) || [],
    len: parseInt(sessionStorage.getItem('len')) || 0
  },
  mutations: {
    addFlie (state, file) {
      state.len = state.len + 1
      let fe = {
        file: file,
        name: file.name ? file.name.substring(0, file.name.length - 3) : '未命名',
        content: file.content || '',
        path: file.path || '',
        index: state.len,
        ischange: false
      }
      state.flieList.push(fe)
      sessionStorage.setItem('len', JSON.stringify(state.len))
      sessionStorage.setItem('flieList', JSON.stringify(state.flieList))
    },
    removeFile (state, index) {
      state.flieList.splice(index, 1)
      sessionStorage.setItem('flieList', JSON.stringify(state.flieList))
    },
    updateFile (state, index, file) {
      state.flieList[index].file = file
      sessionStorage.setItem('flieList', JSON.stringify(state.flieList))
    },
    removeAll (state) {
      state.flieList = []
      sessionStorage.setItem('flieList', JSON.stringify(state.flieList))
    }
  }
}
