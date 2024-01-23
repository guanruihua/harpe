import type { Number_len_16 } from '../type'
import { isNumberArray } from 'asura-eye'

// 密钥和初始化向量
const keyData = new Uint8Array([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
])

const ivData = new Uint8Array([
  17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
])

export interface AES_CBC_Config {
  name?: 'RSA-OAEP' | 'AES-CTR' | 'AES-CBC' | 'AES-GCM'
  key?: Number_len_16
  iv?: Number_len_16
}

export const getConfig = (config: AES_CBC_Config = {}) => {
  const result = {
    keyData,
    ivData,
    name: 'AES-CBC'
  }
  if (
    config.name &&
    ['RSA-OAEP', 'AES-CTR', 'AES-CBC', 'AES-GCM'].includes(config.name)
  ) {
    result.name = config.name
  }
  if (isNumberArray(config.key) && config.key.length === 16) {
    result.keyData = new Uint8Array(config.key)
  }
  if (isNumberArray(config.iv) && config.iv.length === 16) {
    result.ivData = new Uint8Array(config.iv)
  }
  return result
}
