<template lang="html">
  <div class="recommend" ref="recommend">
    <!--幻灯组件-->
    <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
      <slider>
        <div v-for="(item,index) in recommends " :key="index">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" />
          </a>
        </div>
      </slider>
    </div>

  </div>
</template>

<script>
import { getRecommend } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import Slider from '@/components/base/slider'

export default {
  name: 'recommend',
  data () {
    return {
      recommends: []
    }
  },
  components: {
    Slider
  },
  created () {
    this.initRecommend()
  },
  methods: {
    async initRecommend () {
      try {
        let res = await getRecommend()
        if (res.code !== ERR_OK) throw new Error('获取信息失败')
        let { slider } = res.data
        console.log(res.data)
        this.recommends = slider
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.recommend{
  width: 100%;
  .slider-wrapper{
    position: relative;
    width: 100%;
    overflow: hidden;
  }
}
</style>
