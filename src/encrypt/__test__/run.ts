import * as _ from '..'

async function exampleUsage4() {
  const keyPair = await _.RSA_OAEP.generateKeyPair()

  const publicKey = keyPair.publicKey
  const privateKey = keyPair.privateKey

  const dataToEncrypt = 'Hello, RSA-OAEP!'

  const encryptedText = await _.RSA_OAEP.encrypt(publicKey, dataToEncrypt)
  console.log('Encrypted data:', encryptedText)

  const decryptedText = await _.RSA_OAEP.decrypt(privateKey, encryptedText)
  console.log('Decrypted text:', decryptedText)

  return {
    dataToEncrypt,
    encryptedText,
    decryptedText
  }
}

async function exampleUsage3() {
  const key = await _.AES_GCM.generateKey()

  const dataToEncrypt = 'Hello, AES-GCM!'

  const encryptedText = await _.AES_GCM.encrypt(key, dataToEncrypt)
  console.log('Encrypted text:', encryptedText)

  const decryptedText = await _.AES_GCM.decrypt(key, encryptedText)
  console.log('Decrypted text:', decryptedText)

  return {
    dataToEncrypt,
    encryptedText,
    decryptedText
  }
}

async function exampleUsage2() {
  const key = await _.AES_CTR.generateKey()
  const dataToEncrypt = 'Hello, AES-CTR!'
  const encryptedText = await _.AES_CTR.encrypt(key, dataToEncrypt)
  console.log('Encrypted text:', encryptedText)
  const decryptedText = await _.AES_CTR.decrypt(key, encryptedText)
  console.log('Decrypted text:', decryptedText)

  return {
    dataToEncrypt,
    encryptedText,
    decryptedText
  }
}

async function exampleUsage() {
  const key = await _.AES_CBC.generateKey()

  const dataToEncrypt = 'Hello, AES-CBC!'

  const encryptedText = await _.AES_CBC.encrypt(key, dataToEncrypt)
  console.log('Encrypted text:', encryptedText)

  const decryptedText = await _.AES_CBC.decrypt(key, encryptedText)
  console.log('Decrypted text:', decryptedText)
  return {
    dataToEncrypt,
    encryptedText,
    decryptedText
  }
}

export const getData = async () => [
  {
    dataToEncrypt: 'Original Data',
    encryptedText: 'Encrypted Data',
    decryptedText: 'Decrypted Data'
  },
  await exampleUsage(),
  await exampleUsage2(),
  await exampleUsage3(),
  await exampleUsage4()
]
