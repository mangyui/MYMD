export default {
  state: {
    user: JSON.parse(localStorage.getItem('user') || '{}') || {}
  },
  mutations: {
    initUserInfo (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    logoutUser (state, user) {
      state.user = {}
      localStorage.removeItem('user')
    }
  }
}
