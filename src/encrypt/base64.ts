/**
 * @description 无法转换中文?
 */

export function toBase64(value: string){
  return window.btoa(value)
}
export function base64ToString(value: string){
  return window.atob(value)
}