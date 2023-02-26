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
 * @title isDesktop
 * @description 是台式机/笔记本电脑
 * @returns {boolean}
 */
export function isDesktop(): boolean {
  return !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
}


// 判断是否支持 Intersection
export function isSupportIntersection() {
  return (
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype
  )
}

// 判断是否IOS
export const isIOS = (() => {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
})()

// 判断是否安卓
export const isAndroid = (() => {
  return /android/.test(navigator.userAgent.toLowerCase())
})()

// 判断微信内置浏览器
// export function isWeixin() {
//   const ua = navigator.userAgent.toLowerCase();
//   return (ua.match(/MicroMessenger/i) == "micromessenger")
// }

export function checkSupportWebp() {
  return (
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0
  )
}

// export function checkSupportWebp2() {
//   var img = new Image();
//   img.onload = img.onerror = (event) => {
//     return event && event?.type === "load" ? img.width == 1 : false;
//   };
//   img.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
// }

/**
 * @title isMobile
 * @description 是移动设备
 * @returns {boolean}
 */
export function isMobile(): boolean {
  const agent = navigator.userAgent;
  const k = ["android", "iphone", "ipod", "ipad", "windows phone", "mqqbrowser"];
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)) return true
  let flag = false;
  // Windows
  if (agent.indexOf("Windows NT") < 0 || (agent.indexOf("Windows NT") >= 0 && agent.indexOf("compatible; MSIE 9.0;") >= 0)) {
    // Mac PC
    if (agent.indexOf("Windows NT") < 0 && agent.indexOf("Macintosh") < 0) {
      for (const item of k) {
        if (agent.indexOf(item) >= 0) {
          flag = true;
          break;
        }
      }
    }
  }
  return flag;
}
