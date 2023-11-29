import { type ObjectType } from 'abandonjs';

/**
 * @title  readJsonFile
 * @description 读取Json文件内容, 不支持大文件
 * @param {File} file 
 * @returns {string}
 */
export function readJsonFile<T = ObjectType>(file: File): Promise<T> {
  const reader = new FileReader();
  return new Promise<T>((rs, rj) => {
    try {
      reader.onload = function (event: any) {
        const contents = event.target.result
        try {
          rs(JSON.parse(contents))
        } catch (error) {
          rs({} as T)
        }
      };
      reader.readAsText(file);
    } catch (error) {
      rj(error)
    }
  })
}