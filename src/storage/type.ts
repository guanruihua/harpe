type _StorageBaseValue = undefined | null | string | number

export type StorageBaseValue = _StorageBaseValue
export type StorageObjectValue<T> = Record<string, T | never>
export type StorageArrayValue<T> = (T | never)[]

export type StorageValue = StorageBaseValue | StorageObjectValue<unknown> | StorageArrayValue<unknown>

export type StorageCallback = (key: string, value?: StorageValue, defaultValue?: StorageValue) => StorageValue

export interface StorageConfig {
	defaultValue?: StorageValue
	setCallback?: StorageCallback
	getCallback?: StorageCallback
}

export interface StorageProps extends Storage {
	storage: Storage
	config?: StorageConfig
}