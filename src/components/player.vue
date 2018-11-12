<template lang="html">
  <div class="player" v-show="playList.length">
    <!--大屏播放方式-->
    <transition name="normal"
                @enter="enter"
                @after-enter="afteEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <!--背景图片-->
        <div class="background">
          <img :src="currentSong.image" alt="" width="100%" height="100%">
        </div>
        <!--头部展示-->
        <div class="top">
          <div class="back" @click.stop="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <!--中间歌曲封面展示-->
        <div class="middle">
          <!--一级页面-->
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class='addCls'>
                <img :src="currentSong.image" alt="" class="image">
              </div>
            </div>
          </div>
        </div>
        <!--底部操作部分-->
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left" :class="disabeCls">
              <i @click.stop="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disabeCls">
              <i @click.stop="togglePlay" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disabeCls">
              <i  @click.stop="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--小屏播放方式-->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click.stop='open'>
        <div class="icon">
          <img :class="addCls" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlay" :class="miniIcon"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <!--音乐播放器-->
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error"></audio>
  </div>
</template>

<script>
import animations from 'create-keyframe-animation'
import { mapGetters, mapMutations } from 'vuex'
import { prefixStyle } from '@/common/js/dom'

const transform = prefixStyle('transform')

export default {
  name: 'player',
  data () {
    return {
      songReady: false
    }
  },
  computed: {
    addCls () {
      return this.playing ? 'play' : 'play pause'
    },
    disabeCls () {
      return this.songReady ? '' : 'disable'
    },
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    ...mapGetters('player', [
      'playing',
      'playList',
      'fullScreen',
      'currentSong',
      'currentIndex'
    ])
  },
  watch: {
    currentSong () {
      // 当DOM加载完毕后获取播放器
      this.$nextTick(() => {
        let audio = this.$refs.audio
        audio.play()
      })
    },
    playing (newPlayState) {
      // 当DOM加载完毕后获取播放器
      this.$nextTick(() => {
        let audio = this.$refs.audio
        newPlayState ? audio.play() : audio.pause()
      })
    }
  },
  methods: {
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    ready () {
      this.songReady = true
    },
    next () {
      if (!this.songReady) return // 没有加载好直接return
      let index = this.currentIndex + 1
      if (index === this.playList.length) { // 判断界限
        index = 0
      }
      this.setCurrentIndex(index)
      if (!this.playing) this.togglePlay() // 切换歌曲的时候如果是停止状态就改变状态
      this.songReady = false // 切换一首歌把歌曲转改变为false 为下首歌加载完毕做个标志位
    },
    prev () {
      if (!this.songReady) return // 没有加载好直接return
      let index = this.currentIndex - 1
      if (index === 0) { // 判断界限
        index = this.playList.length
      }
      this.setCurrentIndex(index)
      if (!this.playing) this.togglePlay() // 切换歌曲的时候如果是停止状态就改变状态
      this.songReady = false // 切换一首歌把歌曲转改变为false 为下首歌加载完毕做个标志位
    },
    error () {
      this.songReady = true // 当歌曲加载失败的时候也能执行切换歌曲操作
    },
    enter (el, done) {
      const { x, y, scale } = this._getPosAndScale()
      // 声明动画对象
      let animationObj = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      // 注册JS创建动画
      animations.registerAnimation({
        name: 'move',
        animation: animationObj,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      // 启动动画
      let cdWrapperEl = this.$refs.cdWrapper
      animations.runAnimation(cdWrapperEl, 'move', done)
    },
    afteEnter () {
      // 取消动画注册
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      let cdWrapperEl = this.$refs.cdWrapper
      cdWrapperEl.style.transition = 'all 0.4s'
      cdWrapperEl.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      cdWrapperEl.addEventListener('transitionend', done) // 监听动画完成函数执行done函数
    },
    afterLeave () {
      let cdWrapperEl = this.$refs.cdWrapper
      cdWrapperEl.style.transition = ''
      cdWrapperEl.style[transform] = ''
    },
    togglePlay () {
      this.setPlayingState(!this.playing)
    },
    _getPosAndScale () {
      const targetWidth = 40 // 底部mini的专辑图标宽度
      const paddingLeft = 40 // 底部mini的专辑图距离左边的距离
      const paddingbBottom = 30 // 底部mini的专辑图标距离底部的距离
      const paddingTop = 80 // 中间的专辑图标距离顶部的距离
      const width = window.innerWidth * 0.8 // 算出当前中间图标的宽度 因为设置的为80%
      const scale = targetWidth / width // 小图标占大图标的百分比
      const x = -(window.innerWidth / 2 - paddingLeft) // x轴偏移量
      const y = window.innerHeight - paddingTop - paddingbBottom - width / 2 // y轴的偏移量
      return { x, y, scale }
    },
    ...mapMutations('player', {
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

.player{
  .normal-player{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top{
      position: relative;
      margin-bottom: px2rem(50px);
      .back{
        position: absolute;
        top: 0;
        left: px2rem(12px);
        z-index: 50;
        .icon-back{
          display: block;
          padding: px2rem(18px);
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }
      .title{
        width: 70%;
        margin: 0 auto;
        line-height: px2rem(80px);
        text-align: center;
        @include txt-overflow(100%);
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle{
        line-height: px2rem(40px);
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;

      }
    }
    .middle{
      position: fixed;
      top:px2rem(160px);
      bottom: px2rem(340px);
      width: 100%;
      white-space: nowrap;
      font-size: 0;
      .middle-l{
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper{
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: px2rem(20px) solid rgba(255,255,255,0.1);
            border-radius: 50%;
            &.play{
              animation: rotate 20s linear infinite;
            }
            &.pause{
              animation-play-state: paused;
            }
            .image{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }
    .bottom{
      position: absolute;
      bottom: px2rem(100px);
      width: 100%;
      .operators{
        display: flex;
        align-items: center;
        .icon{
          flex:1;
          color: $color-theme;
          &.disable{
            color: $color-theme-d
          }
          i{
            font-size: px2rem(60px);
          }
        }
        .i-left{
          text-align: right;
        }
        .i-center{
          padding: 0 px2rem(40px);
          text-align: center;
          i{
            font-size: px2rem(80px);
          }
        }
        .i-right{
          text-align: left
        }
        .icon-favorite{
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,&.normal-leave-active{
      transition: all 0.4s;
      .top,.bottom{
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      }
    }
    &.normal-enter,&.normal-leave-to{
      opacity: 0;
      .top{
        transform: translate3d(0, -100px, 0)
      }
      .bottom{
        transform: translate3d(0, 100px, 0)
      }
    }
  }
  .mini-player{
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: px2rem(120px);
    background: $color-highlight-background;
    &.mini-enter-active,&.mini-leave-active{
      transition: all 0.4s;
    }
    &.mini-enter,&.mini-leave-to{
      opacity: 0;
    }
    .icon{
      flex: 0 0 px2rem(80px);
      width: px2rem(80px);
      padding: 0 px2rem(20px) 0 px2rem(40px);
      img{
        border-radius: 50%;
        &.play{
          animation: rotate 10s linear infinite;
        }
        &.pause{
          animation-play-state: paused;
        }
      }
    }
    .text{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: px2rem(40px);
      overflow: hidden;
      .name{
        margin-bottom: px2rem(4px);
        @include txt-overflow(100%);
        font-size: $font-size-medium;
        color: $color-text;
      }
      .desc{
        @include txt-overflow(100%);
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
    .control{
      flex: 0 0 px2rem(60px);
      width: px2rem(60px);
      padding: 0 px2rem(20px);
      .icon-play-mini, .icon-pause-mini, .icon-playlist{
        font-size: px2rem(60px);
        color: $color-theme-d;
      }
      .icon-mini{
        position: absolute;
        left:0;
        top:0;
        font-size: px2rem(64px);
      }
    }
  }
}

@keyframes rotate {
  0% { transform: rotate(0) }
  100% { transform: rotate(360deg) }
}
</style>
