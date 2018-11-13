<template lang="html">
  <div class="progress-bar" ref="progressBar" @click.stop="changeProgressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="changeProgressStart"
           @touchmove.prevent="changeProgressMove"
           @touchend="changeProgressEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from '@/common/js/dom'
const PROGRESS_BTN_W = 16 // 按钮宽度
const TRANSFROM = prefixStyle('transform')

export default {
  name: 'progressBar',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent (newVal) {
      if (newVal >= 0 && !this.touch.initTouch) {
        let progressBarEl = this.$refs.progressBar
        let offsetWidth = (progressBarEl.clientWidth - PROGRESS_BTN_W) * newVal
        this._offset(offsetWidth)
      }
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    changeProgressStart (e) {
      let touchObj = this.touch
      touchObj.initTouch = true
      touchObj.startX = e.touches[0].pageX
      touchObj.left = this.$refs.progress.clientWidth
    },
    changeProgressMove (e) {
      let touchObj = this.touch
      // 没有初始化就return
      if (!touchObj.initTouch) return
      let deltaX = e.touches[0].pageX - touchObj.startX
      let maxProgressW = this.$refs.progressBar.clientWidth - PROGRESS_BTN_W
      // 设置最大的偏移量
      let offsetWidth = Math.min(maxProgressW, Math.max(0, touchObj.left + deltaX))
      this._offset(offsetWidth)
    },
    changeProgressEnd () {
      this.touch.initTouch = false
      this._triggerPercent()
    },
    changeProgressClick (e) {
      this._offset(e.offsetX) // 直接设置偏移量
      this._triggerPercent()
    },
    _offset (offsetWidth) {
      let progressEl = this.$refs.progress
      let progressBtnEl = this.$refs.progressBtn
      progressEl.style.width = `${offsetWidth}px`
      progressBtnEl.style[TRANSFROM] = `translate3d(${offsetWidth}px,0,0)`
    },
    _triggerPercent () {
      let maxProgressW = this.$refs.progressBar.clientWidth - PROGRESS_BTN_W
      let percent = this.$refs.progress.clientWidth / maxProgressW
      this.$emit('percentChange', percent)
    }
  }
}
</script>

<style lang="scss">
@import "@styles/index.scss";

.progress-bar{
  height: px2rem(60px);
  .bar-inner{
    position: relative;
    top: px2rem(26px);
    height: px2rem(8px);
    background: rgba(0,0,0,0.3);
    .progress{
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper{
      position: absolute;
      left: px2rem(-16px);
      top: px2rem(-26px);
      width: px2rem(60px);
      height: px2rem(60px);
      .progress-btn{
        position: relative;
        top: px2rem(14px);
        left: px2rem(14px);
        box-sizing: border-box;
        width: px2rem(32px);
        height: px2rem(32px);
        border: px2rem(6px) solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
