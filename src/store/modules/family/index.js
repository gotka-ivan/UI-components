import {
  familyAdd,
  familyList,
  familyInfo,
  familyDelete
} from '@src/controllers/family.js'

export default {
  namespaced: true,
  state: () => ({
    familyList: [],
    familyInfo: {
      name: '',
      middlename: '',
      lastname: ''
    },
  }),
  mutations: {
    setFamilyList(state, list) {
      state.familyList = list
    },
    setFamilyInfo(state, familyInfo) {
      state.familyInfo = familyInfo
    },
    reloadFamilyInfo(state) {
      state.familyInfo = {
        name: '',
        middlename: '',
        lastname: '',
      }
    }
  },
  actions: {
    async getFamilyList({ commit }) {
      let list = await familyList()
      list.json().then(response => {
        commit('setFamilyList', response)
      })

    },
    async addFamily({ dispatch }, family) {
      const response = await familyAdd(family)
      console.log('store response',response)
      if (response) dispatch('getFamilyList')
      return response
    },
    async deleteFamily({ dispatch }, id) {
      const response = await familyDelete(id)
      if (response) dispatch('removeFamilyFromList', id)
      return response
    },

    async getFamilyInfo({ commit }, id) {
      const info = await familyInfo({id})
      info.json().then(response => {
        commit('setFamilyInfo', response[0])
      })
    },
    removeFamilyFromList({ state, commit }, id) {
      const familyList = state.familyList
      familyList.forEach((item, familyId) => {
        if (item.id === id) {
          familyList.splice(familyId, 1)
        }
      })
      commit('setFamilyList', familyList)
    }
  },
  getters: {
  }
}
