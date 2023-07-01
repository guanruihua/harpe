import { EmptyObserver } from "./constant";

// https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
export function IntersectionHandler(target: Element | null, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
	if (target === null) return EmptyObserver

	const observer = new IntersectionObserver(callback, options)
	// 开始监听
	observer.observe(target)

	return observer
}