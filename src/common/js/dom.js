function hasClass (el, clsName) {
  let reg = new RegExp('(^|\\s)' + clsName + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass (el, clsName) {
  if (hasClass(el, clsName)) return
  let newClass = el.className.split(' ')
  newClass.push(clsName)
  el.className = newClass.join(' ')
}

export function getData (el, key, val) {
  let prefix = 'data-'
  key = prefix + key
  if (val) {
    return el.setAttribute(key, val)
  } else {
    return el.getAtttribute(key)
  }
}

// 创建一个自动根据浏览器来添加CSS前缀
let elementStyle = document.createElement('div').style
let vender = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    let keyVal = transformNames[key]

    if (elementStyle[keyVal] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  console.log('** 浏览器CSS厂商标识 **', vender)
  if (!vender) return false
  if (vender === 'standard') return style
  // 拼接浏览器厂商标识和style的标签首字母大写
  let styleKey = vender + style.charAt(0).toUpperCase() + style.substr(1)
  console.log('**厂商标识的CSS标签**', styleKey)
  return styleKey
}
