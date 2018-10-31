<template lang="html">
  <div class="loading">
    <img src="@/assets/loading.gif" alt="" width="24" height="24"/>
    <p class="desc" v-show="showDesc">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    title: {
      type: String,
      default: '正在载入中...'
    },
    showDesc: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

.loading{
  width: 100%;
  text-align: center;
  .desc{
    line-height: px2rem(40px);
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>
