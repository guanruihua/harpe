
// 判断是否支持 Intersection
export function isSupportIntersection() {
	return (
		'IntersectionObserver' in window &&
		'IntersectionObserverEntry' in window &&
		'intersectionRatio' in window.IntersectionObserverEntry.prototype
	)
}

// 判断是否IOS
export const isIOS = (() => {
	return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
})()

// 判断是否安卓
export const isAndroid = (() => {
	return /android/.test(navigator.userAgent.toLowerCase())
})()

// 判断微信内置浏览器
// export function isWeixin() {
//   const ua = navigator.userAgent.toLowerCase();
//   return (ua.match(/MicroMessenger/i) == "micromessenger")
// }

export function checkSupportWebp() {
	return (
		document
			.createElement('canvas')
			.toDataURL('image/webp')
			.indexOf('data:image/webp') === 0
	)
}

// export function checkSupportWebp2() {
//   var img = new Image();
//   img.onload = img.onerror = (event) => {
//     return event && event?.type === "load" ? img.width == 1 : false;
//   };
//   img.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=";
// }

// 判断浏览器是否是移动端
export function isMobile() {
	const agent = navigator.userAgent;
	const k = ["android", "iphone", "ipod", "ipad", "windows phone", "mqqbrowser"];
	let flag = false;
	// Windows
	if (agent.indexOf("Windows NT") < 0 || (agent.indexOf("Windows NT") >= 0 && agent.indexOf("compatible; MSIE 9.0;") >= 0)) {
		// Mac PC
		if (agent.indexOf("Windows NT") < 0 && agent.indexOf("Macintosh") < 0) {
			for (let item of k) {
				if (agent.indexOf(item) >= 0) {
					flag = true;
					break;
				}
			}
		}
	}
	return flag;
}
