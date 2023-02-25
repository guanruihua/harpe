// 判断当前是电脑端还是移动
export function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase();
  let bTypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0];
  if ((ua.match(/msie|trident/g) || [])[0]) {
    bTypeInfo = 'msie';
  }
  let pc = '';
  let prefix = '';
  let plat = '';
  //如果没有触摸事件 判定为PC
  const isTouch = 'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1
  if (isTouch) {
    if (ua.indexOf('ipad') !== -1) {
      pc = 'pad';
    } else if (ua.indexOf('mobile') !== -1) {
      pc = 'mobile';
    } else if (ua.indexOf('android') !== -1) {
      pc = 'androidPad';
    } else {
      pc = 'pc';
    }
  } else {
    pc = 'pc';
  }
  switch (bTypeInfo) {
    case 'chrome':
    case 'safari':
    case 'mobile':
      prefix = 'webkit';
      break;
    case 'msie':
      prefix = 'ms';
      break;
    case 'firefox':
      prefix = 'Moz';
      break;
    case 'opera':
      prefix = 'O';
      break;
    default:
      prefix = 'webkit';
      break;
  }
  plat = ua.indexOf('android') > 0 ? 'android' : navigator.platform.toLowerCase();
  return {
    version: (ua.match(/[\s\S]+(?:rv|it|ra|ie)[/: ]([\d.]+)/) || [])[1], //版本
    plat: plat, //系统
    type: bTypeInfo, //浏览器
    pc: pc,
    prefix: prefix, //前缀
    isMobile: pc == 'pc' ? false : true //是否是移动端
  }
}

/**
 * @title isMobile
 * @description 是移动设备
 * @returns {boolean}
 */
export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent)
}

/**
 * @title isDesktop
 * @description 是台式机/笔记本电脑
 * @returns {boolean}
 */
export function isDesktop(): boolean {
  return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}