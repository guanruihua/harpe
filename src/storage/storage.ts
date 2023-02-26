import { isArray, isEmpty, isFunction, isNumber, isObject, isString } from 'check-it-type'
import type { StorageProps, StorageConfig, StorageValue, StorageCallback, StorageObjectValue, StorageArrayValue, StorageBaseValue } from './type'

/**
 * @title StorageClass 
 * @description 对 LocalStorage / SessionStorage 进行二次封装, 添加类型的支持
 */
export class StorageClass implements StorageProps {
	length: number
	storage: Storage

	defaultValue?: StorageValue
	setCallback?: StorageCallback
	getCallback?: StorageCallback

	constructor(storage: Storage, config?: StorageConfig) {
		this.storage = storage
		this.length = storage.length
		const { defaultValue = null, getCallback, setCallback } = config || {}
		this.defaultValue = defaultValue
		if (isFunction(getCallback)) this.getCallback = getCallback
		if (isFunction(setCallback)) this.setCallback = setCallback
	}
	getItem(key: string): string | null {
		return this.storage.getItem(key)
	}
	get(key: string, defaultValue = this.defaultValue): StorageValue {
		const value = this.storage.getItem(key)
		if (isFunction(this.getCallback))
			return this.getCallback(key, value, defaultValue) as StorageValue
		return isEmpty(value) ? defaultValue : value
	}
	getNumber(
		key: string,
		defaultValue = isNumber(this.defaultValue) ? this.defaultValue : 0
	): number {
		const result = Number(this.get(key))
		return isNumber(result) ? result : defaultValue
	}
	getString(
		key: string,
		defaultValue = isString(this.defaultValue) ? this.defaultValue : ''
	): string {
		const result = this.get(key)
		return isString(result) ? result : defaultValue
	}

	getObject<T>(
		key: string,
		defaultValue = isObject(this.defaultValue) ? this.defaultValue : {}
	): StorageObjectValue<T> {
		try {
			const result: StorageObjectValue<T> = JSON.parse(this.get(key) as string || '{}')
			return (isObject(result) ? result : defaultValue) as StorageObjectValue<T>
		} catch (error) {
			return defaultValue as StorageObjectValue<T>
		}
	}

	getArray<T>(
		key: string,
		defaultValue = isArray(this.defaultValue) ? this.defaultValue : []
	): StorageArrayValue<T> {
		try {
			const result: StorageArrayValue<T> = JSON.parse(this.get(key) as string || '{}')
			return isArray(result) ? result : defaultValue
		} catch (error) {
			return defaultValue
		}
	}

	setItem(key: string, value: StorageValue): void {
		return this.setItem(key, JSON.stringify(value))
	}
	key(index: number): string | null {
		return this.storage.key(index)
	}
	removeItem(key: string): void {
		return this.storage.removeItem(key)
	}
	clear(): void {
		return this.storage.clear()
	}
}