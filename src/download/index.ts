// 根据链接地址下载文件
export const downloadFile = function (url) {
  const a = document.createElement('a')
  a.href = url
  a.click()
}