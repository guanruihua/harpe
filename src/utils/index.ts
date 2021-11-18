
// 获取url的参数
export function getWindonHref() {
	let sHref = window.location.href;
	let args = sHref.split('?');
	if (args[0] === sHref) {
		return '';
	}
	let hrefarr = args[1].split('#')[0].split('&');
	let obj = {};
	for (let i = 0; i < hrefarr.length; i++) {
		hrefarr[i] = hrefarr[i].split('=');
		obj[hrefarr[i][0]] = hrefarr[i][1];
	}
	return obj;
}