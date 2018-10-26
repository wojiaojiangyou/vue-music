<template>
  <div id="app">
    <!--头部-->
    <m-header></m-header>
    <!--主体路由展示-->
    <router-view/>
  </div>
</template>

<script>
import mHeader from '@/components/header'

export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    mHeader
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang='scss'>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
