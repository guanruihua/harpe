// 待完成
export const cookie = {
	set: function (name: string, value: string, time: string) {
		document.cookie = name + '=' + value + '; max-age=' + time;
		return this;
	},
	remove: function (name: string) {
		// return this.setCookie(name, '', -1);
	},
	get: function (name: string) {
		const allCookieArr = document.cookie.split('; ');
		for (let i = 0; i < allCookieArr.length; i++) {
			let itemCookieArr = allCookieArr[i].split('=');
			if (itemCookieArr[0] === name) {
				return itemCookieArr[1]
			}
		}
		return undefined;
	}
}

// 获取指定Cookie值
export const getCookie = (k) => {
	const res = RegExp('(^|; )' + encodeURIComponent(k) + '=([^;]*)').exec(document.cookie)
	return res && res[2]
}

// 设置Cookie值
export function setCookie(name, value, expiryDays, encode = false) {
	var Days = expiryDays || 10
	var exp = new Date()
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
	const val = encode ? escape(value) : value
	document.cookie = name + '=' + val + ';domain=ruihuag.com;path=/;expires=' + exp.toUTCString()
}