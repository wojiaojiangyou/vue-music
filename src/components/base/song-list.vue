<template lang="html">
  <div class="song-list">
    <ul>
      <li class="item" @click.stop="selectItem(song,index)" v-for="(song,index) in songs" :key="index">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'songList',
  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    selectItem (song, index) {
      this.$emit('select', song, index)
    },
    getDesc (song) {
      return `${song.singer}·${song.album}`
    }
  }
}
</script>

<style lang="scss">
@import "@styles/index.scss";

.song-list{
  .item{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: px2rem(128px);
    .content{
      flex:1;
      line-height: px2rem(40px);
      overflow: hidden;
      .name{
        @include txt-overflow(100%);
        color: $color-text;
        font-size: $font-size-medium;
      }
      .desc{
        @include txt-overflow(100%);
        color:$color-text-d;
        margin-top: px2rem(8px);
        font-size: $font-size-medium;
      }
    }
  }
}
</style>
