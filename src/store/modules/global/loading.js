export default {
  state: {
    loadsCount: 0
  },
  mutations: {
    globalLoading(state, isLoading) {
      if (isLoading) {
        state.loadsCount++
      } else if (state.loadsCount > 0) {
        state.loadsCount--
      }
    },
    resetGlobalLoading(state) {
      state.loadsCount = 0
    }
  },
  getters: {
    isGlobalLoading: state => Boolean(state.loadsCount)
  }
}
