export interface StorageConfig {
	prefix?: string
	before?: () => boolean
	callback?: () => boolean
	errorCallback?: (error: unknown) => void
}


export interface StorageProps extends Storage {
	storage: Storage
	config?: StorageConfig
}