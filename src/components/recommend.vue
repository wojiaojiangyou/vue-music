<template lang="html">
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!--幻灯组件-->
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in recommends " :key="index">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl" />
              </a>
            </div>
          </slider>
        </div>
        <!--热门歌单-->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" :key="index" class="item">
              <div class="icon">
                <img :src="item.imgurl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <h4 class="name" v-html="item.creator.name"></h4>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <!--other-->
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from '@/api/recommend'
import { ERR_OK } from '@/api/config'
import Slider from '@/components/base/slider'
import Scroll from '@/components/base/scroll'

export default {
  name: 'recommend',
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll
  },
  created () {
    setTimeout(() => {
      this.initRecommend()
    }, 2000)
    this.initDiscList()
  },
  methods: {
    async initRecommend () {
      try {
        let res = await getRecommend()
        if (res.code !== ERR_OK) throw new Error('获取信息幻灯信息失败')
        let { slider } = res.data
        console.log('头部幻灯数据', res.data)
        this.recommends = slider
      } catch (err) {
        console.log('头部幻灯数据报错:', err)
      }
    },
    async initDiscList () {
      try {
        let res = await getDiscList()
        if (res.code !== ERR_OK) throw new Error('获取信息歌单分类失败')
        console.log('歌单分类数据', res)
        let { list } = res.data
        this.discList = list
      } catch (err) {
        console.log('歌单分类数据报错:', err)
      }
    },
    // 防止当异步数据获取的慢的时候scroll不能有效的计算高度 因为幻灯图片也是需要加载的
    loadImage () {
      let scroll = this.$refs.scroll
      if (!this.checkImage) {
        scroll.refresh()
        this.checkImage = true
      }
    }
  }
}
</script>

<style lang="scss">
@import "@styles/index.scss";

.recommend{
  width: 100%;
  .recommend-content{
    height: calc(100vh - 88px);
    overflow: hidden;
    .slider-wrapper{
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list{
      .list-title{
        height: px2rem(130px);
        line-height: px2rem(130px);
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding:0 px2rem(40px) px2rem(40px);
        .icon{
          flex: 0 0 px2rem(120px);
          width: px2rem(120px);
          padding-right: px2rem(40px);
        }
        .text{
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex:1;
          line-height: px2rem(40px);
          overflow: hidden;
          font-size: $font-size-medium;
          .name{
            margin-bottom: px2rem(40px);
            color: $color-text;
          }
          .desc{
            color: $color-text-d;
            @include txt-overflow(100%);
          }
        }
      }
    }
  }
}
</style>
