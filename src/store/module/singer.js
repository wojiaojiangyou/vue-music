import {
  SET_SINGER_PARAMS,
  SET_SINGER_INFO
} from '../mutation-types'

const state = {
  singerParams: {
    area: -100,
    sex: -100,
    genre: -100,
    index: -100,
    sin: 0,
    cur_page: 1
  },
  singer: {}
}

const getters = {
  singerParams (state) {
    return state.singerParams
  },
  singer (state) {
    return state.singer
  }
}

const mutations = {
  [SET_SINGER_PARAMS] (state, params) {
    console.log('触发歌手列表查询参数的更改,原始参数为:', params)
    let originParams = state.singerParams
    if (!params) return originParams
    let key = params.key
    let val = params.val
    originParams[key] = val
  },
  [SET_SINGER_INFO] (state, info) {
    state.singer = info
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
