import { playMode } from '@/common/js/config'
import {
  SET_PLAYING_STATE, SET_FULL_SCREEN,
  SET_PLAY_LIST, SET_SEQUENCE_LIST,
  SET_PLAY_MODE, SET_CURRENT_INDEX
} from '@/store/mutation-types'

const state = {
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

const getters = {
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  playList: state => state.playList,
  sequenceList: state => state.sequenceList,
  mode: state => state.mode,
  currentIndex: state => state.currentIndex,
  currentSong (state) {
    let playList = state.playList
    let playIndex = state.currentIndex
    return playList[playIndex] || {}
  }
}

const mutations = {
  [SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  [SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  [SET_PLAY_LIST] (state, list) {
    state.playList = list
  },
  [SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  [SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  [SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}

const actions = {
  selectPlay ({state, commit}, {list, index}) {
    commit(SET_PLAY_LIST, list)
    commit(SET_SEQUENCE_LIST, list)
    commit(SET_CURRENT_INDEX, index)
    commit(SET_FULL_SCREEN, true)
    commit(SET_PLAYING_STATE, true)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
