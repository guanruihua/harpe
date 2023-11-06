/**
 * @title getUrlParams
 * @description 获取参数值
 * @param {string} url
 * @returns {Record<string,string>}
 */
export function getUrlParams(url: string): Record<string, string> {
	try {
		return JSON.parse(
			`{"${decodeURI(url.split("?")[1])
				.replace(/"/g, '\\"')
				.replace(/&/g, '","')
				.replace(/=/g, '":"')}"}`
		)
	} catch (error) {
		return {}
	}
}

/**
 * @title getUrlParamIterator
 * @description 获取url参数 Iterator
 * @param {string} url
 * @returns {Iterable<[string, string]>}
 */
export function getUrlParamIterator(url: string): Iterable<[string, string]> {
	return new URLSearchParams(url)
}