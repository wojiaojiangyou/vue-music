<template lang="html">
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <!--进图条背景图层-->
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <!--当前进度条展示-->
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <!--图标填充-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'progress-circle',
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return  {
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffset () {
      return (1 - this.percent) * this.dashArray
    }
  }
}
</script>

<style lang="scss">
@import "@styles/index.scss";

.progress-circle{
  position: relative;
  circle{
    stroke-width: px2rem(16px);
    transform-origin: center;
    &.progress-background{
      transform: scale(0.9);
      stroke: $color-theme-d;
    }
    &.progress-bar{
      transform: scale(0.9) rotate(-90deg);
      stroke: $color-theme;
    }
  }
}
</style>
