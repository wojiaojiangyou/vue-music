import Vue from 'vue'
import Vuex from 'vuex'
import singer from './module/singer'
import musicPlayer from './module/music-player'
import createLogger from 'vuex/dist/logger' // vuex中自带logger插件
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    singer,
    player: musicPlayer
  },
  strict: debug,
  plugins: debug ? [ createLogger() ] : []
})
