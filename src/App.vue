<template>
  <div id="app">
    <router-view/>
    <GlobalAlert :alert="getGlobalAlert" />
  </div>
</template>
<script>
import GlobalAlert from '@src/components/ui/global/Alert.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    GlobalAlert
  },
  computed: {
    ...mapGetters(['getGlobalAlert'])
  },
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
