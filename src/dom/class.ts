import { isArray } from "asura-eye"

/**
 * @title hasClass
 * @description 查询元素是否存在某个class
 * @param element {HTMLElement}
 * @param className {string|string[]}
 * @param strict {boolean=false} true: 要 className 全部符合
 * @returns {boolean}
 */
export function hasClass(element: HTMLElement, className: string | string[], strict = false): boolean {
  if (isArray(className)) {

    for (let i = 0; i < className.length; i++) {
      if (new RegExp('(^|\\s)' + className[i] + '(\\s|$)').test(element.className))
        return true
      else if (strict) {
        return false
      }
    }
  } else {
    return new RegExp('(^|\\s)' + className + '(\\s|$)').test(element.className)
  }
  return false
}

/**
 * @title addClass
 * @description 给某个元素添加class元素
 * @param element {HTMLElement }
 * @param className {string}
 * @returns {boolean}
 */
export function addClass(element: HTMLElement, className: string | string[]): boolean {
  try {
    if (hasClass(element, className)) return false
    const curClass = element.className.split(' ')
    curClass.concat(className)
    element.className = curClass.join(' ')
    return true
  } catch (error) {
    return false
  }
}

/**
 * @title removeClass
 * @description 删除指定class
 * @param element {HTMLElement}
 * @param className {string|string[]}
 * @returns {boolean}
 */
export function removeClass(element: HTMLElement, className: string | string[]): boolean {
  if (!hasClass(element, className)) return false
  try {
    if (isArray(className)) {
      element.className = element.className.split(' ').filter(name => !className.includes(name)).join(' ')
      return true
    }
    const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
    element.className = element.className.replace(reg, ' ')
    return true
  } catch (error) {
    return false
  }
}

/**
 * @title clearClass 
 * @description 清空 class
 * @returns {boolean}
 */
export function clearClass(element: HTMLElement): boolean {
  try {
    if (element.className) {
      element.className = ''
      return true
    }
  } catch (error) {
    return false
  }
  return false
}