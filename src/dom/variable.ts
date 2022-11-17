export function addCSSVariable(dom: any, key: string, value: any) {

	if (dom?.style) {
		console.log(dom.style)
		dom.style[key] = value
	}
	console.log({ dom, key, value }, dom?.style)

	return
}
