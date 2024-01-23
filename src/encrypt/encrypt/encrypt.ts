import { type AES_CBC_Config, getConfig } from './config'

// 加密
export async function encrypt(plaintext: string, config: AES_CBC_Config = {}) {
  const { keyData, ivData } = getConfig(config)
  // 创建 AES-CBC 密钥
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'AES-CBC' },
      false,
      ['encrypt']
    )
    try {
      const encryptedData = await crypto.subtle.encrypt(
        {
          name: 'AES-CBC',
          iv: ivData
        },
        key,
        new TextEncoder().encode(plaintext)
      )
      // 将加密后的结果转换为 Base64 或其他格式
      return window.btoa(
        String.fromCharCode.apply(null, new Uint8Array(encryptedData))
      )
    } catch (error) {
      console.error(error)
    }
  } catch (error_1) {
    console.error(error_1)
  }
}
