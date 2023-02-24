/**
 * @title isTabActive
 * @description 当前选项卡是否在后台
 * @returns {boolean}
 */
export const isTabActive = () => !document.hidden


/**
 * @title isFocus
 * @description 元素是否处于焦点
 * @param element {HTMLElement}
 * @returns {boolean}
 */
export const isFocus = (element: HTMLElement) => (element === document.activeElement)

