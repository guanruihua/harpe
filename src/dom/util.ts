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