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

// 将 ArrayBuffer 转换为 Base64 字符串
export function arrayBufferToBase64(buffer: ArrayBuffer) {
  const binary = String.fromCharCode.apply(null, new Uint8Array(buffer))
  return window.btoa(binary)
}

// 将 Base64 字符串转换为 ArrayBuffer
export function base64ToArrayBuffer(base64: string) {
  const binary = window.atob(base64)
  const length = binary.length
  const buffer = new ArrayBuffer(length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < length; i++) {
    view[i] = binary.charCodeAt(i)
  }
  return buffer
}

// 将 CryptoKey 对象导出为 ArrayBuffer
async function exportCryptoKey(key:CryptoKey) {
  const exportedKey = await crypto.subtle.exportKey('raw', key)
  return new Uint8Array(exportedKey).buffer
}



export async function cryptoKeyToBase64(key: Uint8Array) {
  console.log(key)
  // return uint8ArrayToBase64(await exportCryptoKey(key) as any)
  return uint8ArrayToBase64(key)
  // return key
}

export async function base64ToCryptoKey(base64: string) {
  return base64ToUint8Array(base64)
}
