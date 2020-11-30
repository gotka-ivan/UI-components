import { store, systemApi } from '@holder/store/index.js'

export const checkExistAuth = (to, from, next) => {
  console.log('>>> navigate to', to.path, 'from', from.path)

  if (store.state.profile.isEmpty)
    store.dispatch('updateProfile').then(
      async response => {
        next()
        let regionCode = localStorage.getItem('loyalty/region/code') || 78
        store.dispatch('updateBank')
        store.dispatch('updateTransport')
        store.dispatch('updateBonusAndStatus')
        await store.dispatch('loyalty/loadRegions')
        store.dispatch('loyalty/switchRegion', { code: regionCode })
      },
      error => {
        if (from.meta.noAutoLogout) return
        else
          switch (error.response.status) {
            case 403:
              next({ name: 'destroyed' })
              break
            case 406:
              next({ name: 'nouser' })
              break
            case 423:
              next({ name: 'nouser', query: { esia: true } })
              break
            default:
              next({ name: 'destroyed' })
              break
          }
      }
    )
  else
    systemApi.systemCheckAuth((error, data, response) => {
      switch (response.status) {
        case 200:
          next()
          break
        default:
          next({ name: 'destroyed' })
          break
      }
    })
}

export const checkNoAuth = (to, from, next) => {
  if (to.query.esia) next()
  else if (!store.state.profile.isEmpty)
    store.dispatch('updateProfile').then(
      async response => {
        next()
        let regionCode = localStorage.getItem('loyalty/region/code') || 78
        store.dispatch('updateBank')
        store.dispatch('updateTransport')
        store.dispatch('updateBonusAndStatus')
        await store.dispatch('loyalty/loadRegions')
        store.dispatch('loyalty/switchRegion', { code: regionCode })
      },
      error => {
        switch (error.response.status) {
          case 403:
            next({ name: 'destroyed' })
            break
          case 406:
            next({ name: 'nouser' })
            break
          case 423:
            next({ name: 'nouser', query: { esia: true } })
            break
          default:
            next({ name: 'destroyed' })
            break
        }
      }
    )
  else
    systemApi.systemCheckAuth((error, data, response) => {
      console.log('>>> auth code', response.status)
      console.log('>>> navigate to', to.path)
      switch (response.status) {
        case 200:
          next({ name: 'main' })
          break
        default:
          next()
          break
      }
    })
}
