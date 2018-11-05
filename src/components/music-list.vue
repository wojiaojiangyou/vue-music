<template lang="html">
  <div class="music-list">
      <!--返回的logo-->
      <div class="back" @click.stop="$router.back()"><i class="icon-back"></i></div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <!--背景图片的遮罩-->
        <div class="filter"></div>
        <!--随机播放按钮-->
        <div class="play-wrapper" v-show="songs.length" ref="randomBtn">
          <div class="play">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
      </div>
      <!--滑动遮罩层-->
      <div class="bg-layer" ref="layer"></div>
      <!--歌曲信息列表-->
      <scroll class="list" :data="songs" ref="list" @scroll="setScrollY" :listenr-scroll="true" :probe-type="3">
        <div class="song-list-wrap">
          <song-list :songs="songs"></song-list>
        </div>
        <!--loading包裹-->
        <div class="loading-container" v-show="!songs.length">
          <loading></loading>
        </div>
      </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/base/scroll'
import SongList from '@/components/base/song-list'
import Loading from '@/components/base/loading'
import { prefixStyle } from '@/common/js/dom'

const TABBAR_H = 40
const TRANSFORM = prefixStyle('transform')
const FILTER = prefixStyle('filter')

export default {
  name: 'music-list',
  data () {
    return {
      scrollY: 0
    }
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImage})`
    }
  },
  mounted () {
    let layerEl = this.$refs.layer
    let listEl = this.$refs.list.$el
    let bgImageH = this.$refs.bgImage.clientHeight
    this.minScrollY = -bgImageH + TABBAR_H
    // 因为背景设置了百分比占位高度 需要这边去获取视图高度来设置scroll的位置
    listEl.style.top = `${bgImageH}px`
    // 设置下当前layer的高度
    layerEl.style.height = `calc( 100vh - ${bgImageH}px )`
  },
  watch: {
    scrollY (newVal) {
      let layerEl = this.$refs.layer
      let randomBtnEl = this.$refs.randomBtn
      let tranalateY = Math.max(this.minScrollY, newVal) // 这边设置了遮罩的最大偏移高度
      layerEl.style[TRANSFORM] = `translate3d(0,${tranalateY}px,0)`
      // 这边需要设置下文字滑动遮罩图片的问题 更改bgImage的样式
      let bgImageEl = this.$refs.bgImage
      let zIndex = 0
      let scale = 1
      let blur = 0
      // 滑动距离与图片的高度的百分比
      let percent = Math.abs(newVal / bgImageEl.clientHeight)
      // 判断如果是向下拉的时候方法
      if (newVal > 0) {
        zIndex = 10
        scale = 1 + percent
      } else {
        blur = Math.min(5 * percent, 5)
      }

      if (newVal < tranalateY) {
        zIndex = 10
        bgImageEl.style.paddingTop = 0
        bgImageEl.style.height = `${TABBAR_H}px`
        randomBtnEl.style.display = 'none'
      } else {
        bgImageEl.style.paddingTop = '70%'
        bgImageEl.style.height = 0
        randomBtnEl.style.display = 'block'
      }
      bgImageEl.style.zIndex = zIndex
      bgImageEl.style[TRANSFORM] = `scale(${scale})`
      bgImageEl.style[FILTER] = `blur(${blur}px)`
    }
  },
  methods: {
    setScrollY (pos) {
      this.scrollY = pos.y
    }
  }
}
</script>

<style lang="scss">
@import "@styles/index.scss";

.music-list{
  .back{
    position: absolute;
    top: 0;
    left: px2rem(12px);
    z-index: 50;
    .icon-back{
      display: block;
      padding: px2rem(20px);
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title{
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      text-align: center;
      line-height: px2rem(80px);
      font-size: $font-size-large;
      color: $color-text;
      @include txt-overflow(100%);
  }
  .bg-image{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .filter{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7,17,27,0.4);
    }
    .play-wrapper{
      position: absolute;
      bottom: px2rem(40px);
      z-index: 50;
      width: 100%;
      .play{
        box-sizing: border-box;
        width: px2rem(270px);
        padding: px2rem(14px) 0;
        margin: 0  auto;
        text-align: center;
        border: px2rem(2px) solid $color-theme;
        color: $color-theme;
        border-radius: px2rem(200px);
        font-size: 0;
        .icon-play{
          display: inline-block;
          vertical-align: middle;
          margin-right: px2rem(12px);
          font-size: $font-size-medium-x;
        }
        .text{
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }
  }
  .bg-layer{
    position: relative;
    height: 100%;
    background: $color-background;
  }
  .list{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song-list-wrap{
      padding:px2rem(40px) px2rem(60px);
    }
    .loading-container{
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
    }
  }
}
</style>
