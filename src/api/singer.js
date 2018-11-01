import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
// singerIndex代表当前的歌手按字母分类的索引 -100 代表全部
export function getSingerList (params) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  let queryParams = {
    comm: {
      ct: 24,
      cv: 10000
    },
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: params
    }
  }

  let data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    callback: 'jsonpCallback',
    data: JSON.stringify(queryParams)
  })

  return jsonp(url, data, options)
}

export function getSingerDetail (mid) {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  let data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: mid,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  })

  return jsonp(url, data, options)
}
