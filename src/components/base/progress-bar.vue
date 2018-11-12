<template lang="html">
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn">
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
      if (newVal >= 0) {
        let progressBarEl = this.$refs.progressBar
        let progressEl = this.$refs.progress
        let progressBtnEl = this.$refs.progressBtn
        let offsetWidth = (progressBarEl.clientWidth - PROGRESS_BTN_W) * newVal
        progressEl.style.width = `${offsetWidth}px`
        progressBtnEl.style[TRANSFROM] = `translate3d(${offsetWidth}px,0,0)`
      }
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
