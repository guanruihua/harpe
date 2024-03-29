/**
 * @title isFocus
 * @description 元素是否处于焦点
 * @param {HTMLElement} element
 * @returns {boolean}
 */
export const isFocus = (element: HTMLElement) => (element === document.activeElement)