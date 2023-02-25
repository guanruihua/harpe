import { isEffectObject } from "check-it-type"

/**
 * @title addCSSVariable
 * @description 给dom节点添加 变量
 * @param dom {HTMLElement]}
 * @param key {string}
 * @param value {string}
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
 * @param dom {HTMLElement]}
 * @param record {[key:string]:string}
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