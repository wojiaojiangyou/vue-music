<template lang="html">
  <div class="listview-wrap">
    <scroll class="listview"
      :listenr-scroll='true'
      :probe-type='3'
      @scroll="listenScroll"
      ref="listview"
      :data="singerInfo.singerlist"
    >
      <!--显示列表-->
      <div class="list-group">
        <!--标题-->
        <h2 class="list-group-title">{{showSelectInfo}}</h2>
        <!--显示列表-->
        <ul>
          <li class="list-group-item" ref="listitems" @click.stop="selectSinger(item)" v-for="item in singerInfo.singerlist" :key="item.singer_id">
            <img v-lazy="item.singer_pic" :key="item.singer_pic" class="avatar"/>
            <span class="name">{{item.singer_name}}</span>
          </li>
        </ul>
      </div>
    </scroll>
    <!--头部固定显示信息-->
    <div class="fixed-header" v-show="isShowFixedTitle">
      <h2 class="fixed-title">{{showSelectInfo}}</h2>
    </div>
    <!--歌手首个文字提示-->
    <transition name='fade' mode='out-in'>
      <div class="singer-name-tip" v-show="firstSingerName && isShowSingerName">{{firstSingerName}}</div>
    </transition>
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
        <div class="categray-wrap" v-if='isShowSonGateGray'>
          <scroll-one class="son-gategray" :data="sonFilterMenus">
            <div>
              <div class="categray" :class="{'active':singerParams[sonCateGrayKey]==item.id }" v-for="(item,index) in sonFilterMenus" :key="index" @click.stop='dealSonMenuClick(item)'>{{item.name}}</div>
            </div>
          </scroll-one>
        </div>
      </transition>
    </div>
    <!--loading载入-->
    <div class="loading-container" v-show="!singerInfo.singerlist">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Scroll from '@/components/base/scroll'
import Loading from '@/components/base/loading'

const FIXED_TITLE_H = 30

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
      enabledPullUp: true,
      categrayMap: [
        { key: 'area', title: '地区' },
        { key: 'genre', title: '风格' },
        { key: 'index', title: '字母' },
        { key: 'sex', title: '性别' }
      ],
      isShowFilterMenu: true,
      isShowCateGray: false,
      isShowSonGateGray: false,
      isShowSingerName: false,
      isShowFixedTitle: false,
      sonCateGrayKey: null,
      singerNameIndex: 0,
      scrollY: 0
    }
  },
  computed: {
    ...mapState('singer', ['singerParams']),
    showSelectInfo () {
      let info = this.singerInfo
      let showInfo = ''
      if (info.total === 0) return '检查数据...'
      // 拿到当前选中的信息
      let map = this.categrayMap
      // 返回选中的信息
      map.forEach((item, index) => {
        let keyVal = info[item.key] // 拿到当前选中的key的值
        if (keyVal || keyVal === 0) {
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
    },
    firstSingerName () {
      let singerlist = this.singerInfo.singerlist
      let singerNameIndex = this.singerNameIndex
      let name = singerlist ? singerlist[singerNameIndex] : null
      return name ? name.singer_name.substr(0, 1) : null
    }
  },
  components: {
    Scroll,
    ScrollOne: Scroll,
    Loading
  },
  watch: {
    singerInfo () {
      // 当信息发生变化的时候的需要重新获取高度
      this._getListItemsHeight()
    },
    scrollY (newVal) {
      let newY = newVal
      // 判断是否是开始
      if (newY > 0) {
        this.singerNameIndex = 0
        return
      }
      // 判断移动的位置
      let listItemsH = this.listItemsH
      let totalH = this.listItemTotalH
      for (let i = 0; i < listItemsH.length - 1; i++) {
        let height1 = listItemsH[i] // 每个列表的上限
        let height2 = listItemsH[i + 1] // 每个列表的下线
        // 当移动到某个区间内
        if (!height2 || (-newY >= height1 && -newY < height2)) {
          this.singerNameIndex = i
          break
        }
      }
      // 当移动到最底部继续移动时设置为最后一个索引
      if (-newY > totalH) this.singerNameIndex = listItemsH.length - 1
      // 判断是否显示歌手缩写
      this.isShowSingerName = true
      if (this.singerNameTimer) clearTimeout(this.singerNameTimer)
      this.singerNameTimer = setTimeout(() => {
        this.isShowSingerName = false
      }, 300)
    }
  },
  created () {
    this.listItemsH = []
    this.listItemTotalH = 0
  },
  mounted () {
    // 等待列表渲染完毕后获得高度
    setTimeout(() => {
      this._getListItemsHeight()
    }, 300)
  },
  methods: {
    selectSinger (singer) {
      this.$emit('select', singer)
    },
    listenScroll (pos) {
      this.scrollY = pos.y
      // 判断是否显示固定的头部
      if (-this.scrollY >= FIXED_TITLE_H) this.isShowFixedTitle = true
      else this.isShowFixedTitle = false
    },
    showFilterMenu () {
      this.isShowFilterMenu = false
      this.isShowCateGray = true
    },
    showSonFilterMenu (item) {
      this.sonCateGrayKey = item.key
      this.isShowCateGray = false
      this.isShowSonGateGray = true
      console.log('当前选择的分类', this.sonCateGrayKey)
    },
    dealSonMenuClick (item) {
      this.isShowSonGateGray = false
      this.isShowFilterMenu = true
      this.$emit('refresh', {
        key: this.sonCateGrayKey,
        val: item.id
      })
    },
    _getListItemsHeight () {
      let listItems = this.$refs.listitems
      if (!listItems) return
      let height = 30
      let listItemsH = this.listItemsH
      listItemsH.push(height)
      listItems.forEach((item, index) => {
        height += item.clientHeight
        listItemsH.push(height)
      })
      // 设置总高度
      this.listItemTotalH = height
    }
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

@mixin fixedTitle () {
  height: px2rem(60px);
  line-height: px2rem(60px);
  text-align: center;
  font-size: $font-size-small;
  color: $color-text-l;
  background: $color-highlight-background;
}

.listview-wrap{
  position: relative;
  .listview{
    position: relative;
    width: 100%;
    height: calc(100vh - 88px);
    overflow: hidden;
    background: $color-background;
    .list-group{
      padding-bottom: px2rem(60px);
      .list-group-title{
        @include fixedTitle()
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
  }
  .fixed-header{
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    .fixed-title{
      @include fixedTitle()
    }
  }
  .singer-name-tip{
    position: fixed;
    top: 50%;
    left:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50%,-50%);
    width: px2rem(80px);
    height: px2rem(80px);
    border-radius: 50%;
    background: $color-highlight-background;
    color: white;
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
          width: px2rem(80px);
          height: px2rem(80px);
          line-height: px2rem(80px);
          text-align: center;
          background: $color-theme;
          color: white;
          margin-bottom: px2rem(10px);
          border-radius: 50%;
          &.active{
            background: $color-theme-select;
          }
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
  .loading-container{
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
</style>
