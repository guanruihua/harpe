// 将文本转换为 Uint8Array
export function textToUint8Array(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

// 将 Uint8Array 转换为 Base64 字符串
export function uint8ArrayToBase64(array: Uint8Array): string {
  return window.btoa(String.fromCharCode.apply(null, array))
}

// 将 Base64 字符串转换为 Uint8Array
export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = window.atob(base64)
  const array = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    array[i] = binaryString.charCodeAt(i)
  }
  return array
}