import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@src/store/index.js'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'families',
        beforeEnter: async (to, from, next) => {
          if (!store.state.family.familyList.length)  await store.dispatch('family/getFamilyList')
          next()
        },
        component: () => import('@src/views/Families.vue').then(c => c.default)
      },
      {
        path: '/family',
        component: {
          template: `<router-view />`
        },
        children: [
          {
            path: '',
            name: 'family-add',
            beforeEnter: async (to, from, next) => {
              store.commit('family/reloadFamilyInfo')
              next()
            },
            component: () => import('@src/views/Family.vue').then(c => c.default)
          },
          {
            path: ':id',
            name: 'family-read',
            beforeEnter: async (to, from, next) => {
              store.dispatch('family/getFamilyInfo', Number(to.params.id))
              next()
            },
            component: () => import('@src/views/Family.vue').then(c => c.default)
          },
        ]
      }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
