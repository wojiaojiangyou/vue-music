import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
import VueLazyLoad from 'vue-lazyload'
// 重置默认样式
import 'normalize.css'
// 引入字体图标
import '@/assets/iconfont/music-icon.scss'
// 引入移动端点击300毫秒延的库
import FastClick from 'fastclick'
FastClick.attach(document.body)
// 载入图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('@/assets/loading.png'),
  error: require('@/assets/no-result@2x.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
