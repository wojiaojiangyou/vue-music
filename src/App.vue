<template>
  <div id="app">
    <!--头部-->
    <m-header></m-header>
    <!--头部选择-->
    <m-tab></m-tab>
    <!--主体路由展示-->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import mHeader from '@/components/header'
import mTab from '@/components/tab'

export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    mHeader,
    mTab
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
