import { isEffectObject, isFunction } from "asura-eye";
import { EmptyObserver } from "./constant";

/**
 * @title  MutationHandler
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver/observe
 * @description  观察Dom 的改变
 * @param {HTMLElement} target 观察的Dom
 * @param {MutationCallback | Record<keyof MutationObserverInit, MutationCallback>} callback
 * @param {MutationObserverInit} options 观察器的配置（需要观察什么变动）
 * @returns {MutationObserver}
 * 
 * options {MutationObserverInit}  观察器的配置
 * 
 * - subtree {?boolean=false} 当为 true 时，将会监听以 target 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 target
 * 
 * - childList {?boolean=false} 当为 true 时，监听 target 节点中发生的节点的新增与删除（同时，如果 subtree 为 true，会针对整个子树生效）。默认值为 false。
 * 
 * - attributes {?boolean=false} 当为 true 时观察所有监听的节点属性值的变化。默认值为 true，当声明了 attributeFilter 或 attributeOldValue，默认值则为 false。
 * 
 * - attributeFilter {?boolean=false} 一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。
 * 
 * - attributeOldValue {?boolean=false} 当为 true 时，记录上一次被监听的节点的属性变化；可查阅监听属性值了解关于观察属性变化和属性值记录的详情
 * 
 * - characterData {?boolean=false} 当为 true 时，监听声明的 target 节点上所有字符的变化。默认值为 true，如果声明了 characterDataOldValue
 * 
 * - characterDataOldValue {?boolean=false} 当为 true 时，记录前一个被监听的节点中发生的文本变化
 */
export function MutationHandler(
	target: HTMLElement | null,
	callback: MutationCallback | Record<keyof MutationObserverInit, MutationCallback>,
	options: MutationObserverInit = { attributes: true }
) {
	if (target === null) return EmptyObserver

	// 当观察到变动时执行的回调函数
	const cb = function (mutationsList: MutationRecord[], observer: MutationObserver) {
		if (isFunction(callback)) {
			return callback(mutationsList, observer)
		}
		if (isEffectObject(callback)) {
			for (const mutation of mutationsList) {
				// Use traditional 'for loops' for IE 11
				const type = mutation.type
				if (callback[type] && isFunction(callback[type])) {
					callback[type](mutationsList, observer)
				}
			}
		}

	};

	// 创建一个观察器实例并传入回调函数
	const observer = new MutationObserver(cb);

	// 以上述配置开始观察目标节点
	observer.observe(target, options)

	// 之后，可停止观察
	// observer.disconnect();

	return observer

}