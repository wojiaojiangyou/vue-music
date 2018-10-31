const state = {
  singerParams: {
    area: -100,
    sex: -100,
    genre: -100,
    index: -100,
    sin: 0,
    cur_page: 1
  }
}

const mutations = {
  SET_SINGER_PARAMS (state, params) {
    console.log('触发歌手列表查询参数的更改,原始参数为:', params)
    let originParams = state.singerParams
    if (!params) return originParams
    let key = params.key
    let val = params.val
    originParams[key] = val
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
