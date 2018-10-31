<template lang="html">
  <div ref="scrolltemp">
    <slot></slot>
  </div>
</template>

<script>
import Loading from '@/components/base/loading'
import BScroll from 'better-scroll'

export default {
  name: 'scrollWrap',
  props: {
    // 派发滚动事件
    probeType: {
      type: Number,
      default: 1
    },
    // 添加点击事件
    click: {
      type: Boolean,
      default: true
    },
    listenrScroll: {
      type: Boolean,
      default: false
    },
    // 数据
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
    }
  },
  components: {
    Loading
  },
  mounted () {
    // 初始化scoll
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      if (!this.$refs.scrolltemp) return
      this.scroll = new BScroll(this.$refs.scrolltemp, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad
      })
      console.log('当前初始化scroll的信息', this.scroll)
      // 是否监听滚动
      if (this.listenrScroll) {
        console.log('------启动了滚动监听-------')
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    refresh () {
      this.scroll && this.scroll.refresh()
      console.log('调用了刷新scroll的refresh方法！')
    }
  },
  watch: {
    data () {
      // 当有数据变化时 刷新下scroll的结构
      setTimeout(this.refresh, 20)
    }
  }
}
</script>

<style lang="scss">
@import '@styles/index.scss';

.loading-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: px2rem(60px);
}
</style>
