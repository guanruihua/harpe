import { EmptyObserver } from "./constant"

// 监视 Element 内容盒或边框盒或者 SVGElement 边界尺寸的变化。
// https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver
export function ResizeHandler(
	target: HTMLElement | null,
	callback: ResizeObserverCallback,
	options?: ResizeObserverOptions
) {
	if (target === null) return EmptyObserver
	const observer = new ResizeObserver(callback)

	observer.observe(target, options)

	return observer
}