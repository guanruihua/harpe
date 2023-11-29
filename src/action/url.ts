import { toString, type ObjectType } from 'abandonjs'
import { isObject } from 'asura-eye'

/**
 * @title getUrlParams
 * @description 获取参数值
 * @param {string} url
 * @returns {Record<string,string>}
 */
export function getUrlParams(url: string): Record<string, string> {
	try {
		return JSON.parse(
			`{"${decodeURI(url.split(/\?|#/)[1])
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
	if (url.indexOf('?') > -1) {
		return new URLSearchParams(url.split(/\?|#/)[1])
	}
	return new URLSearchParams(url)
}

/**
 * @title toUrlParams
 * @description 将对象参数转 url 参数格式
 * @param {ObjectType} value 
 * @returns {string}
 */
export function toUrlParams(value: ObjectType): string {
	const params = new URLSearchParams()
	if (isObject(value)) {
		for (const key in value) {
			params.append(key, toString(value[key]))
		}
	}
	return params.toString()
}

/**
 * @title addUrlParams
 * @description url 添加 对象参数(转 url 参数格式)
 * @param {string} url
 * @param {ObjectType} value 
 * @returns {string}
 */
export function addUrlParams(url: string, value: ObjectType): string {
	const params = new URLSearchParams()
	if (isObject(value)) {
		for (const key in value) {
			params.append(key, toString(value[key]))
		}
	}
	return url + '&' + params.toString()
}

/**
 * @description 返回值为 false: 拦截跳转, 返回值 为string: 表示要跳转的链接
 */
type ListenLinkCallback = (url: string) => string | false

/**
 * @title listenLinkEvent
 * @description 拦截 链接跳转事件
 * @param {ListenLinkCallback} callback 
 * @param {('a'|'window.open')[]} monitor 不支持`window.location`
 */
export function listenLinkEvent(callback?: ListenLinkCallback, monitor: ('a'|'window.open')[] = ['a', 'window.open']) {

	const orgOpen = window.open
	monitor.includes('a') &&
		document.body.addEventListener(
			"click",
			function (event) {
				// 兼容处理
				const target = event.target || event.srcElement
				if (target.nodeName.toLocaleLowerCase() === "a") {
					// 对捕获到的 a 标签进行处理
					if (event.preventDefault)
						event.preventDefault()
					else if (window.event)
						window.event.returnValue = true

					const choosePush = (el) => {
						const target = el.getAttribute("target");
						const href = el.getAttribute("href");
						const url = callback ? callback(href) : href
						if (url === false) return
						if (target === "_blank") {
							orgOpen(url)
						} else {
							window.location.href = url
						}
					}

					// 处理完 a 标签的内容，重新触发跳转，根据原来 a 标签页 target 来判断是否需要新窗口打开        
					choosePush(target)
				}
			}.bind(this)
		)


	monitor.includes('window.open') && (
		window.open = function (...args) {
			const [url, ...rest] = args
			if (callback) {
				const newUrl = callback(url)
				if (newUrl) {
					orgOpen(newUrl, ...rest)
				}
				return
			}
			return orgOpen(...args)
		}.bind(this)
	)

}