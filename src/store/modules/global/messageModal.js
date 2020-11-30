export default {
  state: {
    show: false,
    message: '',
    type: 'info'
  },
  mutations: {
    switchMessage(state, { show = false, message = '', type = 'info' } = {}) {
      state.show = show
      state.message = message
      state.type = type
    }
  },
  getters: {
    getMessageModal: state => state
  }
}
