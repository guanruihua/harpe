import { ObjectType, stringify } from "abandonjs"
import { isEmpty, type, isEffectArray } from "asura-eye"

export * from './clear'

/**
 * @title getCookie<T>
 * @description 获取 cookie 值
 * @param key {string}
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

export interface CookieConfig extends ObjectType {
	/**
	 * @description 过期时间 (天)
	 */
	expiryDays?: number
	domain?: string
	path?: string
}

export type BaseValue = string | number | ObjectType


/**
 * @title setCookie
 * @description 设置cookie 值以及相关配置
 * @param name {string}
 * @param value {BaseValue|BaseValue[]}
 * @param config {?CookieConfig}
 * @return {void}
 */
export function setCookie(name: string, value: BaseValue | BaseValue[], config?: CookieConfig) {
	const { expiryDays, domain, path } = config || {}
	const Days = expiryDays || 10
	const expiryTime = new Date()
	expiryTime.setTime(expiryTime.getTime() + Days * 24 * 60 * 60 * 1000)
	let result = `${name}=${stringify(value)}<${type(value)}>;expires=${expiryTime.toUTCString()}`
	if (domain) result += ';domain=' + domain
	if (path) result += ';path=' + path
	document.cookie = result
}