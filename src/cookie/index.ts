// 待完成

export const cookie = {
	set: function (name:string, value:string, time:string) {
		document.cookie = name + '=' + value + '; max-age=' + time;
		return this;
	},
	remove: function (name:string) {
		// return this.setCookie(name, '', -1);
	},
	get: function (name:string) {
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