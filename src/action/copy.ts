/**
 * @title copyText
 * @description 复制文本
 * @param text {string}
 * @returns {boolean}
 */
export function copyText(text: string) {
	// clipboardData 在页面上将需要的东西复制到剪贴板上
	const clipboardData = (window as any).clipboardData
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text)
		return true
	} else if (clipboardData) {
		clipboardData.clearData()
		clipboardData.setData('Text', text)
		return true
		// 注意 document.execCommand 已弃用 但是有些浏览器依旧支持 用的时候记得看兼容情况
	} else if (document.execCommand) {
		// 通过创建 dom 元素，去把要复制的内容拿到 
		const el = document.createElement('textarea')
		el.value = text
		el.setAttribute('readonly', '')
		el.style.position = 'absolute'
		el.style.left = '-9999px'
		document.body.appendChild(el)
		el.select()
		// 拷贝当前内容到剪贴板
		document.execCommand('copy')
		// 删除 el 节点
		document.body.removeChild(el)
		return true
	}
	return false
}

/**
 * @title banCopy
 * @description 禁止右键、选择、复制
 */
export function banCopy() {
	['contextmenu', 'selectstart', 'copy'].forEach(function (ev) {
		document.addEventListener(ev, function (event) {
			return (event.returnValue = false)
		})
	})
}

/**
 * @title banCopy
 * @description 启用右键、选择、复制
 */
export function notBanCopy() {
	['contextmenu', 'selectstart', 'copy'].forEach(function (ev) {
		document.addEventListener(ev, function (event) {
			return (event.returnValue = true)
		})
	})
}