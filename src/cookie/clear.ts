/**
 * @title clearCookie 
 * @description 清除存储在网页中的所有 cookie
 */
export const clearCookie = () => document
	.cookie.split(';')
	.forEach(cookie =>
		document.cookie =
		cookie.replace(/^ +/, '')
			.replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)
	);
