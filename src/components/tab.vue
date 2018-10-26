<template lang="html">
  <div class="tab-wrap">
    <router-link v-for="(item,index) in tabs" :key="index" class="tab-item" tag="div" :to="{path:item.path}">
      <span class="tab-link">{{item.name}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      tabs: [
        { name: '推荐', path: '/recommend' },
        { name: '歌手', path: '/singer' },
        { name: '排行', path: '/rank' },
        { name: '搜索', path: '/search' }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

.tab-wrap{
  display: flex;
  align-items: center;
  height: px2rem(88px);
  font-size: $font-size-medium;
  .tab-item{
    flex:1;
    text-align: center;
    .tab-link{
      padding-bottom: px2rem(10px);
      color: $color-text-l;
    }
    &.router-link-active{
      .tab-link{
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
