
// 获取url的参数
export function getWindonHref(): any {
	let sHref: string = window.location.href;
	let args: string[] = sHref.split('?');
	if (args[0] === sHref) {
		return '';
	}
	let hrefarr: any = args[1].split('#')[0].split('&');
	let obj: any = {};
	for (let i = 0; i < hrefarr.length; i++) {
		hrefarr[i] = hrefarr[i].split('=');
		obj[hrefarr[i][0]] = hrefarr[i][1];
	}
	return obj;
}