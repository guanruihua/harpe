/* eslint-disable*/
/**
 * @title parseQueryString 
 * @description 获取url上的值
 * @param url {string} 
 * @returns object {object} url的的参数集
 */
export function parseQueryString(url: string = window.location.href) {
	const search = url[0] === '?' ? url : url.substring(url.lastIndexOf('?'));
	const q = {};
	search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = decodeURIComponent(v));
	return q;
}

/**
 * @title getQueryString 
 * @description 获取url上对应的name的值
 * @param url  {string=window.location.href}
 * @param name {string}
 * @returns string { url对应name的值 }
 */
export function getQueryString(url: string = window.location.href, name: string) {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)?', 'i')
	const r = url.substr(1).match(reg)
	if (r !== null) {
		return decodeURI(r[2])
	}
	return null
}

// 获取URL hash后面的参数
export function getHashQueryString(key) {
	const after = window.location.href.split('?')[1]
	if (after) {
		const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`)
		const r = after.match(reg)
		if (r != null) {
			return decodeURIComponent(r[2])
		}
		return null
	}
	return null
}
