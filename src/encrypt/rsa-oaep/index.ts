// 生成密钥对
async function generateKeyPair() {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
      hash: 'SHA-256'
    },
    true,
    ['encrypt', 'decrypt']
  )
  return keyPair
}

// 加密
async function encrypt(
  publicKey: CryptoKey,
  data: string
): Promise<ArrayBuffer> {
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP'
    },
    publicKey,
    new TextEncoder().encode(data)
  )
  return encryptedData
}

// 解密
async function decrypt(
  privateKey: CryptoKey,
  encryptedData: ArrayBuffer
): Promise<Uint8Array> {
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP'
    },
    privateKey,
    encryptedData
  )
  return new Uint8Array(decryptedData)
}

export default {
  generateKeyPair,
  encrypt,
  decrypt
}
