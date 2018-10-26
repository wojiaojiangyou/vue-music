import Vue from 'vue'
import App from './App'
import router from './router'
// 重置默认样式
import 'normalize.css'
// 引入字体图标
import '@/assets/iconfont/music-icon.scss'
// 引入移动端点击300毫秒延的库
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
