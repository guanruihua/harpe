/**
 * @title  readTextFile
 * @description 读取txt文件内容, 不支持大文件
 * @param {File} file 
 * @returns {string}
 */
export function readTextFile(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise<string>((rs, rj) => {
    try {
      reader.onload = function (event: any) {
        const contents = event.target.result;
        rs(contents)
      };
      reader.readAsText(file);
    } catch (error) {
      rj(error)
    }
  })
}