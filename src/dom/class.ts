
// 查询元素是否存在某个class
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

// 给某个元素添加class元素
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let curClass = el.className.split(' ');
  curClass.push(className);
  el.className = curClass.join(' ');
}

// 删除某个元素的 class
export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return;
  }

  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
  el.className = el.className.replace(reg, ' ');
}
