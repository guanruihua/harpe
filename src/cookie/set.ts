
import { ObjectType, stringify } from "abandonjs"
import { type } from "asura-eye"

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
 * @param {string} name
 * @param {BaseValue|BaseValue[]} value 
 * @param {CookieConfig} [config] 
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