8. toFullScreen：全屏
function toFullScreen() {
  let elem = document.body
  elem.webkitRequestFullScreen
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
    ? elem.msRequestFullscreen()
    : elem.requestFullScreen
    ? elem.requestFullScreen()
    : alert('浏览器不支持全屏')
}

9. exitFullscreen：退出全屏
function exitFullscreen() {
  let elem = parent.document
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
    : alert('切换失败,可尝试Esc退出')
}