// https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver/PerformanceObserver
export function PerformanceHandler(callback: PerformanceObserverCallback, options?: PerformanceObserverInit) {
	const observer = new PerformanceObserver(callback);
	observer.observe(options);
	return observer
}