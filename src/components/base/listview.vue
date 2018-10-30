<template lang="html">
  <scroll class="listview" :data="singerInfo.singerlist">
    <!--显示列表-->
    <div class="list-group">
      <!--标题-->
      <h2 class="list-group-title">{{showSelectInfo}}</h2>
      <!--显示列表-->
      <ul>
        <li class="list-group-item" v-for="(item,index) in singerInfo.singerlist" :key="index">
          <img v-lazy="item.singer_pic" class="avatar"/>
          <span class="name">{{item.singer_name}}</span>
        </li>
      </ul>
    </div>
    <!--悬浮菜单-->
    <div class="filter-menu" v-show="isShowFilterMenu" @touchstart.stop='showFilterMenu'>浏览</div>
    <!--包裹菜单-->
    <div class="filter-menus-wrap" @touchstart.stop.prevent="">
      <transition name='slider' mode='out-in'>
        <!--一级分类菜单-->
        <div class="categray-wrap" v-if="isShowCateGray">
          <div class="categray" @touchstart.stop='showSonFilterMenu(item)' v-for="(item,index) in categrayMap" :key="index">{{item.title}}</div>
        </div>
      </transition>
      <transition name='slider' mode='out-in'>
        <!--二级分类菜单-->
        <div class="categray-wrap" v-if='sonCateGrayKey'>
          <scroll class="son-gategray" :data="sonFilterMenus">
            <div>
              <div class="categray" v-for="(item,index) in sonFilterMenus" :key="index" @click.stop='dealSonMenuClick'>{{item.name}}</div>
            </div>
          </scroll>
        </div>
      </transition>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/base/scroll'

export default {
  name: 'listview',
  props: {
    singerInfo: {
      type: Object,
      default: () => ({
        area: -100,
        genre: -100,
        index: -100,
        sex: -100,
        singerlist: [],
        tags: {
          area: [],
          gnre: [],
          index: [],
          sex: []
        },
        total: 0
      })
    }
  },
  data () {
    return {
      categrayMap: [
        { key: 'area', title: '地区' },
        { key: 'genre', title: '风格' },
        { key: 'index', title: '字母' },
        { key: 'sex', title: '性别' }
      ],
      isShowFilterMenu: true,
      isShowCateGray: false,
      sonCateGrayKey: null
    }
  },
  computed: {
    showSelectInfo () {
      let info = this.singerInfo
      let showInfo = ''
      if (info.total === 0) return '检查数据...'
      // 拿到当前选中的信息
      let map = this.categrayMap
      // 返回选中的信息
      map.forEach((item, index) => {
        let keyVal = info[item.key] // 拿到当前选中的key的值
        if (keyVal) {
          let keyTags = info.tags[item.key] // 拿到tags下面的数组
          let selectKeyInfo = keyTags.find(item => item.id === keyVal) // 找到具体选择的风格
          let str = `${item.title} : ${selectKeyInfo.name}`
          showInfo += (index === (map.length - 1) ? str : `${str} | `)
        }
      })

      return showInfo
    },
    sonFilterMenus () {
      let info = this.singerInfo
      let sonSelectKey = this.sonCateGrayKey
      let finalTypes = []
      if (sonSelectKey) finalTypes = info.tags[sonSelectKey]
      console.log('选择完分类后的获取的tags数组', finalTypes)
      return finalTypes
    }
  },
  components: {
    Scroll
  },
  methods: {
    showFilterMenu () {
      this.isShowFilterMenu = false
      this.isShowCateGray = true
    },
    showSonFilterMenu (item) {
      this.sonCateGrayKey = item.key
      this.isShowCateGray = false
      console.log('当前选择的分类', this.sonCateGrayKey)
    },
    dealSonMenuClick () {
      this.sonCateGrayKey = null
      this.isShowFilterMenu = true
    }
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

.listview{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group{
    padding-bottom: px2rem(60px);
    .list-group-title{
      height: px2rem(60px);
      line-height: px2rem(60px);
      text-align: center;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .list-group-item{
      display: flex;
      align-items: center;
      padding: px2rem(40px) 0 0 px2rem(60px);
      .avatar{
        width: px2rem(100px);
        height: px2rem(100px);
        border-radius: 50%;
      }
      .name{
        margin-left: px2rem(40px);
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .filter-menu{
    position: fixed;
    right: px2rem(30px);
    bottom:px2rem(30px);
    width: px2rem(80px);
    height: px2rem(80px);
    text-align: center;
    line-height: px2rem(80px);
    border-radius: 50%;
    background: $color-theme;
    color: white;
  }
  .filter-menus-wrap{
    display: flex;
    align-items: center;
    position: fixed;
    top: px2rem(176px);
    right: 0;
    height: calc(100vh - 88px);
    font-size: $font-size-medium;
    .categray-wrap{
        .categray{
          width: px2rem(100px);
          height: px2rem(80px);
          line-height: px2rem(80px);
          text-align: center;
          background: $color-theme;
          color: white;
          margin-bottom: px2rem(10px);
          &:last-child{
            margin-bottom: 0;
          }
        }
        .son-gategray{
          display: flex;
          align-items: center;
          height: calc(100vh - 200px);
          overflow: hidden;
        }
    }
  }
}
</style>
