import { arrayBufferToBase64, base64ToArrayBuffer } from '../util'
import { isString } from 'asura-eye'

// 生成密钥对
async function generateKeyPair(): Promise<{
  publicKey: string
  privateKey: string
}> {
  const keyPair: any = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]), // 65537
      hash: 'SHA-256'
    },
    true,
    ['encrypt', 'decrypt']
  )

  // 导出公钥为可导出的格式（"spki" 表示 SubjectPublicKeyInfo）
  const publicKey = await window.crypto.subtle
    .exportKey('spki', keyPair.publicKey)
    .then(exportedPublicKey => {
      // 将导出的公钥转换为 ArrayBuffer
      const publicKeyBuffer = new Uint8Array(exportedPublicKey)

      // 将 ArrayBuffer 转换为 Base64 字符串
      const publicKeyBase64 = window.btoa(
        String.fromCharCode.apply(null, publicKeyBuffer)
      )

      // 在这里保存 publicKeyBase64，或进行其他操作
      // console.log('公钥的 Base64 字符串:', publicKeyBase64)
      return publicKeyBase64
    })
    .catch(error => {
      console.error('导出公钥时出错:', error)
      return ''
    })

  // 导出私钥为可导出的格式（"pkcs8" 表示 PrivateKeyInfo）
  const privateKey = await window.crypto.subtle
    .exportKey('pkcs8', keyPair.privateKey)
    .then(exportedPrivateKey => {
      // 将导出的私钥转换为 ArrayBuffer
      const privateKeyBuffer = new Uint8Array(exportedPrivateKey)

      // 将 ArrayBuffer 转换为 Base64 字符串
      const privateKeyBase64 = window.btoa(
        String.fromCharCode.apply(null, privateKeyBuffer)
      )

      // 在这里保存 privateKeyBase64，或进行其他操作
      // console.log('私钥的 Base64 字符串:', privateKeyBase64)
      return privateKeyBase64
    })
    .catch(error => {
      console.error('导出私钥时出错:', error)
      return ''
    })

  // console.log(publicKey, privateKey)

  return {
    publicKey,
    privateKey
  }
}

// 加密
async function encrypt(
  publicKey: CryptoKey | string,
  data: string
): Promise<string> {
  if (isString(publicKey)) {
    // 将公钥的 Base64 字符串解码为 ArrayBuffer
    const publicKeyBuffer = Uint8Array.from(window.atob(publicKey), c =>
      c.charCodeAt(0)
    ).buffer
    // 使用 importKey 方法将解码后的 ArrayBuffer 导入为公钥对象
    const myPublicKey = await window.crypto.subtle
      .importKey(
        'spki',
        publicKeyBuffer,
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        false,
        ['encrypt']
      )
      .then(importedPublicKey => {
        // 在这里可以使用导入的公钥对象进行加密等操作
        // console.log('导入的公钥对象:', importedPublicKey)
        return importedPublicKey
      })
      .catch(error => {
        console.error('导入公钥时出错:', error)
      })
    if (!myPublicKey) {
      return ''
    }
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP'
      },
      myPublicKey,
      new TextEncoder().encode(data)
    )
    return arrayBufferToBase64(encryptedData)
  }

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP'
    },
    publicKey,
    new TextEncoder().encode(data)
  )
  return arrayBufferToBase64(encryptedData)
}

// 解密
async function decrypt(
  privateKey: CryptoKey | string,
  encryptedData: string
): Promise<string> {
  if (isString(privateKey)) {
    // 将私钥的 Base64 字符串解码为 ArrayBuffer
    const privateKeyBuffer = Uint8Array.from(window.atob(privateKey), c =>
      c.charCodeAt(0)
    ).buffer

    // 使用 importKey 方法将解码后的 ArrayBuffer 导入为私钥对象
    const myPrivateKey = await window.crypto.subtle
      .importKey(
        'pkcs8',
        privateKeyBuffer,
        { name: 'RSA-OAEP', hash: 'SHA-256' },
        false,
        ['decrypt']
      )
      .then(importedPrivateKey => {
        // 在这里可以使用导入的私钥对象进行解密等操作
        // console.log('导入的私钥对象:', importedPrivateKey)
        return importedPrivateKey
      })
      .catch(error => {
        console.error('导入私钥时出错:', error)
      })
    if (myPrivateKey) {
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: 'RSA-OAEP'
        },
        myPrivateKey,
        base64ToArrayBuffer(encryptedData)
      )
      return new TextDecoder().decode(new Uint8Array(decryptedData))
    }
    return ''
  }
  const decryptedData = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP'
    },
    privateKey,
    base64ToArrayBuffer(encryptedData)
  )
  return new TextDecoder().decode(new Uint8Array(decryptedData))
}

export default {
  generateKeyPair,
  encrypt,
  decrypt
}
