<template lang="html">
  <div class="singer-detail-wrap">歌手:{{singer.singer_name}}</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'

export default {
  name: 'singer-detail',
  computed: {
    ...mapGetters('singer', ['singer'])
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
        console.log('res', res.data)
      } catch (err) {
        console.log('当前获得歌手详情出错', err)
      }
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
