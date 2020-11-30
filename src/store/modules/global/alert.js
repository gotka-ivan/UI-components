export default {
  state: {
    message: null,
    isAutoClose: null,
    type: null,
    title: null,
    isShow: false,
    types: {
      success: 'success',
      error: 'error'
    },
    timer: null
  },
  mutations: {
    closeGlobalAlert(state) {
      state.isShow = false
    }
  },
  actions: {
    openGlobalAlert(
      { state, commit },
      { message = 'Сервис временно недоступен', title = false, type = 'error', isAutoClose = true, timeout = 3000 } = {}
    ) {
      state.message = message
      state.title = title
      state.type = type
      state.isAutoClose = isAutoClose
      state.timeout = timeout
      state.isShow = true
      if (isAutoClose) {
        setTimeout(() => {
          commit('closeGlobalAlert')
        }, timeout)
      }
    }
  },
  getters: {
    getGlobalAlert: state => state
  }
}
