import { isEmpty } from "asura-eye"

/**
 * @title downloadFile 
 * @description 根据链接地址下载文件
 * @param {string} url
 */
export const downloadFile = function (url: string) {
  if (isEmpty(url)) return
  const a = document.createElement('a')
  a.href = url
  a.click()
}