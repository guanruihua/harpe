import type { StorageProps, StorageConfig } from './type'

export class StorageClass implements StorageProps {
	config?: StorageConfig | undefined
	length: number
	storage: Storage
	constructor(storage: Storage, config?: StorageConfig) {
		this.storage = storage
		this.length = storage.length
		this.config = config
	}
	clear(): void {
		return this.storage.clear()
	}
	getItem(key: string): string | null {
		return this.storage.getItem(key)
	}
	key(index: number): string | null {
		return this.storage.key(index)
	}
	removeItem(key: string): void {
		return this.storage.removeItem(key)
	}
	setItem(key: string, value: string): void {
		return this.setItem(key, value)
	}
}