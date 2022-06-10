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


/**
 * @title parseQueryString 
 * @description 获取url上的值
 * @param url 
 * @returns object { url的的参数集 }
 */
export function parseQueryString(url:string) {
	url = url ? url : window.location.search;
	let search = url[0] === '?' ? url : url.substring(url.lastIndexOf('?'));
	let q = {};
	search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => q[k] = decodeURIComponent(v));
	return q;
}

/**
 * @title getQueryString 
 * @description 获取url上对应的name的值
 * @param name 
 * @returns string { url对应name的值 }
 */
export function getQueryString(name: string) {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	const r = window.location.search.substr(1).match(reg)
	if (r !== null) {
		return decodeURI(r[2])
	}
	return null
}

// 获取URL hash后面的参数
export function getHashQueryString(key){
  const after = window.location.href.split('?')[1]
  if (after) {
    const reg = new RegExp(`(^|&)${  key  }=([^&]*)(&|$)`)
    const r = after.match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    return null
  }
  return null
}
