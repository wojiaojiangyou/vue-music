import Vue from 'vue'
import Vuex from 'vuex'
import singer from './singer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    singer
  }
})
