import {
  textToUint8Array,
  uint8ArrayToBase64,
  base64ToUint8Array
} from '../util'

// 生成随机的 16 字节密钥
function generateKey() {
  return window.crypto.subtle.generateKey(
    {
      name: 'AES-CTR',
      length: 128
    },
    true,
    ['encrypt', 'decrypt']
  )
}

// 加密
async function encrypt(key: CryptoKey, data: string): Promise<string> {
  const iv = window.crypto.getRandomValues(new Uint8Array(16))
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      counter: iv,
      length: 64 // 64-bit counter
    },
    key,
    textToUint8Array(data)
  )
  const encryptedArray = new Uint8Array(encryptedData)
  const encryptedText = uint8ArrayToBase64(encryptedArray)
  const ivText = uint8ArrayToBase64(iv)
  return ivText + '  :  ' + encryptedText
}

// 解密
async function decrypt(key: CryptoKey, encryptedText: string): Promise<string> {
  const [ivText, encryptedDataText] = encryptedText.split(':')
  const iv = base64ToUint8Array(ivText)
  const encryptedData = base64ToUint8Array(encryptedDataText)
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: 'AES-CTR',
      counter: iv,
      length: 64 // 64-bit counter
    },
    key,
    encryptedData
  )
  const decryptedArray = new Uint8Array(decryptedData)
  const decryptedText = new TextDecoder().decode(decryptedArray)
  return decryptedText
}

export default {
  generateKey,
  encrypt,
  decrypt
}
