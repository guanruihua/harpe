import { type AES_CBC_Config, getConfig } from './config'

export async function decrypt(
  encryptedText: string,
  config: AES_CBC_Config = {}
) {
  const { keyData, ivData } = getConfig(config)
  // 创建 AES-CBC 密钥
  return crypto.subtle
    .importKey('raw', keyData, { name: 'AES-CBC' }, false, ['decrypt'])
    .then(async key => {
      // 解密数据
      const encryptedData = new Uint8Array(
        window
          .atob(encryptedText)
          .split('')
          .map(char => char.charCodeAt(0))
      )
      try {
        const decryptedData = await crypto.subtle.decrypt(
          {
            name: 'AES-CBC',
            iv: ivData
          },
          key,
          encryptedData
        )
        // 将解密后的结果转换为字符串
        return new TextDecoder().decode(decryptedData)
      } catch (error) {
        console.error(error)
      }
    })
    .catch(error => {
      console.error(error)
    })
}
