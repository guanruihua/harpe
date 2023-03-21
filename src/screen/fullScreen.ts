//  toFullScreen：全屏
export function toFullScreen() {
  const elem: any = document.body
  elem.webkitRequestFullScreen
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
      ? elem.mozRequestFullScreen()
      : elem.msRequestFullscreen
        ? elem.msRequestFullscreen()
        : elem.requestFullScreen
          ? elem.requestFullScreen()
          : console.error('浏览器不支持全屏')
}

// 退出全屏
export function exitFullScreen() {
  if ((document as any).exitFullScreen) {
    (document as any).exitFullScreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
}

//  exitFullscreen：退出全屏
export function exitFullscreen(parent: any) {

  const elem: any = parent.document
  elem.webkitCancelFullScreen
    ? elem.webkitCancelFullScreen()
    : elem.mozCancelFullScreen
      ? elem.mozCancelFullScreen()
      : elem.cancelFullScreen
        ? elem.cancelFullScreen()
        : elem.msExitFullscreen
          ? elem.msExitFullscreen()
          : elem.exitFullscreen
            ? elem.exitFullscreen()
            : console.error('切换失败,可尝试Esc退出')
}

// 进入全屏

export function fullScreen(ele = document.body) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if ((ele as any).mozRequestFullScreen) {
    (ele as any).mozRequestFullScreen();
  } else if ((ele as any).webkitRequestFullscreen) {
    (ele as any).webkitRequestFullscreen();
  } else if ((ele as any).msRequestFullscreen) {
    (ele as any).msRequestFullscreen();
  }
}

// 获取当前全屏的节点
export function getFullScreenElement() {
  return (
    document.fullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).msFullScreenElement ||
    (document as any).webkitFullscreenElement ||
    null
  );
}

// 判断当前是否全屏
export function isFullScreen() {
  return !!(
    (document as any).fullscreen ||
    (document as any).mozFullScreen ||
    (document as any).webkitIsFullScreen ||
    (document as any).webkitFullScreen ||
    (document as any).msFullScreen
  );
}

// 判断是否能切到全屏
export function isFullScreenEnabled() {
  return (
    (document as any).fullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).webkitFullscreenEnabled ||
    (document as any).msFullscreenEnabled
  );
}

// 全屏时间监听
// document.addEventListener('fullscreenchange', evt => {
//   if (document.fullscreenElement) {
//     console.log('进入全屏')
//   } else {
//     console.log('退出全屏')
//   }
// })

// 1. document下没有requestFullscreen
// 2. requestFullscreen方法只能由用户触发，比如：在onload事件中不能触发
// 3. 页面跳转需先退出全屏
// 4. 进入全屏的元素，将脱离其父元素，所以可能导致之前某些css的失效
// 5. 解决方案：使用 :full-screen伪类 为元素添加全屏时的样式(使用时为了兼容注意添加-webkit、-moz或-ms前缀)
// 6. 一个元素A全屏后，其子元素要再全屏，需先让元素A退出全屏
// 7. iframe 引入时要添加allowfullscreen="true"属性