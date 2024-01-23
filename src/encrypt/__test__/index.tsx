// encrypt
import React from 'react'
import * as _ from '..'

export default function () {
  const value = '琳妮特'
  const [] = React.useState<string>('')

  // 使用示例
  async function exampleUsage4() {
    const keyPair = await _.RSA_OAEP.generateKeyPair()

    const publicKey = keyPair.publicKey
    const privateKey = keyPair.privateKey

    const dataToEncrypt = ('Hello, RSA-OAEP!')

    const encryptedData = await _.RSA_OAEP.encrypt(publicKey, dataToEncrypt)
    console.log('Encrypted data:', new Uint8Array(encryptedData))

    const decryptedData = await _.RSA_OAEP.decrypt(privateKey, encryptedData)
    const decryptedText = new TextDecoder().decode(decryptedData)
    console.log('Decrypted text:', decryptedText)
  }

  async function exampleUsage3() {
    const key = await _.AES_GCM.generateKey()

    const dataToEncrypt = 'Hello, AES-GCM!'

    const encryptedText = await _.AES_GCM.encrypt(key, dataToEncrypt)
    console.log('Encrypted text:', encryptedText)

    const decryptedText = await _.AES_GCM.decrypt(key, encryptedText)
    console.log('Decrypted text:', decryptedText)
  }

  async function exampleUsage2() {
    const key = await _.AES_CTR.generateKey()
    const dataToEncrypt = 'Hello, AES-CTR!'
    const encryptedText = await _.AES_CTR.encrypt(key, dataToEncrypt)
    console.log('Encrypted text:', encryptedText)
    const decryptedText = await _.AES_CTR.decrypt(key, encryptedText)
    console.log('Decrypted text:', decryptedText)
  }

  async function exampleUsage() {
    const key = await _.AES_CBC.generateKey()

    const dataToEncrypt = 'Hello, AES-CBC!'

    const encryptedText = await _.AES_CBC.encrypt(key, dataToEncrypt)
    console.log('Encrypted text:', encryptedText)

    const decryptedText = await _.AES_CBC.decrypt(key, encryptedText)
    console.log('Decrypted text:', decryptedText)
  }
  const init = async () => {
    // const val = await _.encrypt('琳妮特')
    // const deVal = await _.decrypt(val as string)
    // console.log(val, deVal)
    exampleUsage()
    exampleUsage2()
    exampleUsage3()
    exampleUsage4()
  }

  React.useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <h2>encrypt</h2>
      <p>uuid: {_.uuid()}</p>
      <p>base64: {_.toBase64('ee23')}</p>
      <p>base64toString: {_.base64ToString('ZWUyMw==')}</p>
    </div>
  )
}
