import { type, isObject } from 'asura-eye'

export function storageHoc<T = string>(storage: Storage = localStorage) {
  const getItem = (key: string): T => {
    const getValue = () => {
      const result = storage.getItem(key)
      if (isObject(result) && result['$$value'] !== undefined) {
        return result['$$value']
      }
      return result
    }
    return getValue() as T
  }

  const setItem = (key: string, value: T): void => {
    return storage.setItem(
      key,
      JSON.stringify({
        $$type: type(value),
        $$value: value
      })
    )
  }
  const handleKey = (index: number): string | null => {
    return storage.key(index)
  }
  const removeItem = (key: string): void => {
    return storage.removeItem(key)
  }
  const clear = (): void => {
    return storage.clear()
  }

  return { getItem, setItem, key: handleKey, removeItem, clear }
}

export const localStorageHoc = storageHoc(localStorage)
export const sessionStorageHoc = storageHoc(sessionStorage)