/**
 * @title writeTextFile
 * @description 将文本内容写入文件并保存
 * @param {string} text 内容
 * @param {string} [fileName='temp.txt']
 */
export function writeTextFile(text: string, fileName: string = 'temp.txt') {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;

  // 模拟点击下载链接
  link.click();

  // 释放 URL 对象
  URL.revokeObjectURL(url);
}