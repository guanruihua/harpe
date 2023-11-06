import { isEmpty, isEffectArray } from "asura-eye"

/**
 * @title getCookie<T>
 * @description 获取 cookie 值
 * @param {string} key 
 * @returns {T|String|undefined}
 */
export function getCookie<T>(key: string): T | string | undefined {
	if (isEmpty(document.cookie)) return undefined;
	const matchs = RegExp('(^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)
	if (isEffectArray(matchs) && matchs.length > 1) {
		const record = matchs[2]
		const result = /(.+)(<[a-zA-Z]+>)/.exec(record)
		if (isEffectArray(result) && result.length > 1) {
			const value = result[1]
			const valueType = result[2] || 'String'
			if (valueType === '<Number>') return Number(value) as T
			if (['<Array>', '<Object>'].includes(valueType)) {
				try {
					return JSON.parse(value)
				} catch (error) {
					return value
				}
			}
			return value
		}
		return record
	}
	return undefined
}
