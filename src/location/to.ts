/**
 * @title redirect
 * @description 重定向 到 新的URL
 * @param {string} url
 * ```js
 redirect('https://www.google.com/')
 ```
 */
export const redirect = (url: string) => location.href = url 