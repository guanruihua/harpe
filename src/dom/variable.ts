import { isEffectObject } from "asura-eye"

/**
 * @title addCSSVariable
 * @description 给dom节点添加 变量
 * @param {HTMLElement} dom
 * @param {string} key
 * @param {string} value
 * @returns {boolean}
 */
export function addCSSVariable(dom: HTMLElement, key: string, value: string): boolean {
	try {
		dom.style[key] = value
		return true
	} catch (error) {
		return false
	}
}

/**
 * @title addCSSVariable
 * @description 给dom节点添加 变量
 * @param {HTMLElement} dom
 * @param {ObjectType<string>} record
 * @returns {boolean}
 */
export function addCSSVariables(dom: HTMLElement, record: Record<string, string>): boolean {
	try {
		if (isEffectObject(record)) {
			for (const key in record) {
				dom.style[key] = record[key]
			}
			return true
		}
	} catch (error) {
		return false
	}
	return false
}