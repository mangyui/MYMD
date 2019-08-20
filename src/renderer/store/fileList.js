export default {
  state: {
    fileList: JSON.parse(localStorage.getItem('fileList')) || [],
    len: parseInt(localStorage.getItem('len')) || 0
  },
  mutations: { // 无异步
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
      state.fileList.push(fe)
      localStorage.setItem('len', JSON.stringify(state.len))
      localStorage.setItem('fileList', JSON.stringify(state.fileList))
    },
    removeFile (state, index) {
      state.fileList.splice(index, 1)
      localStorage.setItem('fileList', JSON.stringify(state.fileList))
    },
    updateFile (state, index, file) {
      state.fileList[index].file = file
      localStorage.setItem('fileList', JSON.stringify(state.fileList))
    },
    updateName (state, value) {
      for (let j = 0, len = state.fileList.length; j < len; j++) {
        // eslint-disable-next-line
        if (state.fileList[j].index == value.index) {
          state.fileList[j].name = value.name
          break
        }
      }
      localStorage.setItem('fileList', JSON.stringify(state.fileList))
    },
    updatePath (state, value) {
      for (let j = 0, len = state.fileList.length; j < len; j++) {
        // eslint-disable-next-line
        if (state.fileList[j].index == value.index) {
          state.fileList[j].path = value.path
          break
        }
      }
      localStorage.setItem('fileList', JSON.stringify(state.fileList))
    },
    updateContent (state, value) {
      for (let j = 0, len = state.fileList.length; j < len; j++) {
        // eslint-disable-next-line
        if (state.fileList[j].index == value.index) {
          state.fileList[j].content = value.content
          break
        }
      }
      localStorage.setItem('fileList', JSON.stringify(state.fileList))
    },
    removeAll (state) {
      state.fileList = []
      localStorage.setItem('fileList', JSON.stringify(state.fileList))
    }
  },
  actions: { // 可异步
    updatename ({ commit }, userInfo) {

    }
  }
}
