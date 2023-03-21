import { StorageClass } from './storage'

export * from './storage'
export const localStorageClass = new StorageClass(localStorage)
export const sessionStorageClass = new StorageClass(sessionStorage)
