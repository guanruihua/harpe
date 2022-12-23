// 复制文本
export const copyText = (text) => {
	// clipboardData 在页面上将需要的东西复制到剪贴板上
	const clipboardData = window.clipboardData
	if (clipboardData) {
		clipboardData.clearData()
		clipboardData.setData('Text', text)
		return true
	} else if (document.execCommand) {  // 注意 document.execCommand 已弃用 但是有些浏览器依旧支持 用的时候记得看兼容情况
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
// copyText('hello!') // ctrl + v = copyText  | true

// 13. 复制文本
export function copyPersonURL(content) {
	// const that = this
	if (window.ClipboardData) {
		window.clipboardData.setData('text', content)
	} else {
		; (function (content) {
			document.oncopy = function (e) {
				e.clipboardData.setData('text', content)
				e.preventDefault()
				document.oncopy = null
			}
		})(content)
		document.execCommand('Copy')
	}
}