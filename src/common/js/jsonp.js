import originJsonp from 'jsonp'

export default function jsonp (url, data, opt) {
  url += (url.includes('?') ? '&' : '?') + `${getParams(data)}`
  return new Promise((resolve, reject) => {
    originJsonp(url, opt, (err, data) => {
      if (!err) resolve(data)
      else reject(err)
    })
  })
}

function getParams (data) {
  let url = ''
  for (let key in data) {
    let val = data[key]
    if (val) url += `&${key}=${encodeURIComponent(val)}`
  }
  // 去除第一个&符号
  if (url) url = url.substr(1)

  return url
}
