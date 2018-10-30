<template lang="html">
  <div class="singer-wrap">
    <list-view :singer-info="singerInfo"></list-view>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import listView from '@/components/base/listview'

export default {
  name: 'singer',
  data () {
    return {
      singerInfo: {}
    }
  },
  created () {
    this._initSingerList()
  },
  components: {
    listView
  },
  methods: {
    async _initSingerList () {
      try {
        let res = await getSingerList()
        if (res.code !== ERR_OK) throw new Error('code返回出错')
        console.log('当前歌手列表数据', res.singerList.data)
        this.singerInfo = res.singerList.data
      } catch (err) {
        console.log('获取歌手列表出错', err)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

.singer-wrap{
  position: fixed;
  top: px2rem(176px);
  bottom:0;
  width: 100%;
}

</style>
