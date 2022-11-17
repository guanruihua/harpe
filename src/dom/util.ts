/* eslint-disable*/

// 获取页面滚动距离
export function getScrollTop() {
  let e = 0
  return (
    document.documentElement && document.documentElement.scrollTop
      ? (e = document.documentElement.scrollTop)
      : document.body && (e = document.body.scrollTop),
    e
  )
}

// 拨打电话
export const callPhone = (phone) => {
  const aElement = document.createElement('a')
  aElement.setAttribute('href', `tel:${phone}`)
  document.body.appendChild(aElement)
  aElement.click()
  document.body.removeChild(aElement)
}

// 复制文本
export function copy(value, callback) {
  if (!document.queryCommandSupported('copy')) {
    callback && callback('暂不支持复制')
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.readOnly = Boolean('readOnly')
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, value.length)
  document.execCommand('copy')
  textarea.remove()
  callback && callback('复制成功')
}

// 动态加载第三方js
// export function asyncLoadScript(url): Promise<void> {
//   return new Promise(function (resolve, reject) {
//     const tag = document.getElementsByTagName('script')
//     for (const i of tag) {
//       if (i.src === url) {
//         resolve()
//         return
//       }
//     }
//     const script = document.createElement('script')
//     script.type = 'text/javascript'
//     script.src = url
//     script.onerror = reject
//     document.body.appendChild(script)
//     script.onload = () => {
//       resolve()
//     }
//   })
// }

// 解决 requestAnimationFrame 的兼容问题
// export function requestAnimationFrame() {
//   return window.requestAnimationFrame
//     || window.webkitRequestAnimationFrame
//     || window.mozRequestAnimationFrame
//     || window.oRequestAnimationFrame
//     || (function (callback) {
//       return setTimeout(callback, (callback.interval || （100 / 60) / 2);
//     })
// }