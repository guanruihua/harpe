/**
 * @title getSelectedText
 * @description 获取选中的文字
 * @returns {string}
 */
export function getSelectedText() {
	return (window as any).getSelection().toString()
}