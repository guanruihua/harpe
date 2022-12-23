// 判断当前是电脑端还是移动
export const checkCurrentDeviceType = function () {
  let ua = navigator.userAgent.toLowerCase();
  let btypeInfo = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0];
  if ((ua.match(/msie|trident/g) || [])[0]) {
    btypeInfo = 'msie';
  }
  let pc = '';
  let prefix = '';
  let plat = '';
  //如果没有触摸事件 判定为PC
  let isTocuh = 'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1;
  if (isTocuh) {
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
  switch (btypeInfo) {
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
    version: (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], //版本
    plat: plat, //系统
    type: btypeInfo, //浏览器
    pc: pc,
    prefix: prefix, //前缀
    isMobile: pc == 'pc' ? false : true, //是否是移动端
  };
};

/**
 * 确定设备是移动设备还是台式机/笔记本电脑
 const detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent) ?
    'Mobile' : 'Desktop'
detectDeviceType() // "Mobile" or "Desktop"
 */