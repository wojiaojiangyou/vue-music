<template lang="html">
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '@styles/index.scss';

.m-header{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: px2rem(88px);
  color: $color-theme;
  font-size: 0;
  .icon {
    width: 32px;
    height: 32px;
    margin-right: 9px;
    @include img-retina('~@/assets/logo@2x.png', '~@/assets/logo@3x.png', 100%, 100%);
    background-repeat: no-repeat;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    font-size: $font-size-large;
  }
}
</style>
