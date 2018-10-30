import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config'
// singerIndex代表当前的歌手按字母分类的索引 -100 代表全部
export function getSingerList (singerIndex = -100) {
  let url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  let queryParams = {
    comm: {
      ct: 24,
      cv: 10000
    },
    singerList: {
      module: 'Music.SingerListServer',
      method: 'get_singer_list',
      param: {
        area: -100,
        sex: -100,
        genre: -100,
        index: singerIndex,
        sin: 0,
        cur_page: 1
      }
    }
  }

  let data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    callback: '__jp0',
    data: JSON.stringify(queryParams)
  })

  return jsonp(url, data, options)
}
