
/**
 * @title requestAnimationFrameAdapter
 * @description 解决 requestAnimationFrame 的兼容问题
 * @returns requestAnimationFrame
 */
export function requestAnimationFrameAdapter() {
	return (window as any).requestAnimationFrame
		|| (window as any).webkitRequestAnimationFrame
		|| (window as any).mozRequestAnimationFrame
		|| (window as any).oRequestAnimationFrame
		|| (function (callback: () => void, interval = 1000) {
			return setTimeout(callback, interval)
		})
}