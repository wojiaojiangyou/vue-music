<template lang="html">
  <div class="singer-detail-wrap">
    <!--歌曲列表-->
    <music-list :title="title" :bg-image="songImg" :songs="songs"></music-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
import MusicList from '@/components/music-list'

export default {
  name: 'singer-detail',
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters('singer', ['singer']),
    title () {
      return this.singer.singer_name
    },
    songImg () {
      return this.singer.singer_pic
    }
  },
  components: {
    MusicList
  },
  created () {
    this._getSingerDetailInfo()
  },
  methods: {
    async _getSingerDetailInfo () {
      let singerMid = this.singer.singer_mid
      // 当前没有mid的时候直接返回singer页面
      if (!singerMid) {
        this.$router.push({ path: '/singer' })
        return
      }

      try {
        let res = await getSingerDetail(singerMid)
        if (res.code !== ERR_OK) throw new Error('获取数据出错')
        let songList = this._normalizeSongList(res.data.list)
        console.log('当前的歌曲列表', songList)
        this.songs = songList
      } catch (err) {
        console.log('当前获得歌手详情出错', err)
      }
    },
    _normalizeSongList (list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        ret.push(createSong(musicData))
      })
      return ret
    }
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

.singer-detail-wrap{
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  background: $color-background;
  z-index: 100;
}
</style>
