<template lang="html">
  <div class="iconfont-wrap">
     <div class="myicon" v-for="(item,index) in icons" :key="index">
       <span :class='[item]'></span>
       <span class="name">{{item}}</span>
     </div>
  </div>
</template>

<script>
export default {
  name: 'iconfont',
  data () {
    return {
      icons: [
        'icon-ok', 'icon-close', 'icon-add',
        'icon-ok', 'icon-close', 'icon-add',
        'icon-play-mini', 'icon-playlist', 'icon-music',
        'icon-search', 'icon-clear', 'icon-delete',
        'icon-favorite', 'icon-not-favorite', 'icon-pause',
        'icon-play', 'icon-prev', 'icon-loop', 'icon-mine',
        'icon-sequence', 'icon-random', 'icon-back',
        'icon-next', 'icon-dismiss', 'icon-pause-mini'
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

.iconfont-wrap{
  display: flex;
  justify-content: space-between;
  align-content: space-around;
  flex-wrap: wrap;
  padding: 0 px2rem(40px);
  box-sizing: border-box;
  height: calc(100vh - 88px);
  .myicon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
  }
}
</style>
