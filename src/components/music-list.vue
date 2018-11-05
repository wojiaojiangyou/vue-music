<template lang="html">
  <div class="music-list">
      <!--返回的logo-->
      <div class="back"><i class="icon-back"></i></div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="filter"></div>
      </div>
      <!--滑动遮罩层-->
      <div class="bg-layer" ref="layer"></div>
      <!--歌曲信息列表-->
      <scroll class="list" :data="songs" ref="list" @scroll="setScrollY" :listenr-scroll="true" :probe-type="3">
        <div class="song-list-wrap">
          <song-list :songs="songs"></song-list>
        </div>
      </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/base/scroll'
import SongList from '@/components/base/song-list'

const tabBarH = 40

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
    SongList
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
    this.minScrollY = -bgImageH + tabBarH
    // 因为背景设置了百分比占位高度 需要这边去获取视图高度来设置scroll的位置
    listEl.style.top = `${bgImageH}px`
    // 设置下当前layer的高度
    layerEl.style.height = `calc( 100vh - ${bgImageH}px )`
  },
  watch: {
    scrollY (newVal) {
      let layerEl = this.$refs.layer
      let tranalateY = Math.max(this.minScrollY, newVal) // 这边设置了遮罩的最大偏移高度
      layerEl.style['transform'] = `translate3d(0,${tranalateY}px,0)`
      layerEl.style['webkitTransform'] = `translate3d:(0,${tranalateY}px,0)`
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
  }
}
</style>
