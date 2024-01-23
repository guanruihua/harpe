// 生成随机的 16 字节密钥
export function generateKey() {
  return window.crypto.subtle.generateKey(
    {
      name: "AES-CBC",
      length: 128,
    },
    true,
    ["encrypt", "decrypt"]
  )
}