import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import Singer from '@/components/singer'
import SingerDetail from '@/components/singer-detail'
import Rank from '@/components/rank'
import Search from '@/components/search'
import Iconfont from '@/components/iconfont'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/iconfont',
      component: Iconfont
    }
  ]
})
