/**
 * @title isDarkMode
 * @description 是黑暗模式
 * @return {boolean]}
 */
export const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

// 16.判断当前标签页是否激活
/**
 * @title isActiveTabView
 * @description 当前标签页是激活
 * @returns {boolean}
 */
export const isActiveTabView = () => !document.hidden