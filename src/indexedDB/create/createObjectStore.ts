import { IDBConfig } from '../type'
import { openIDB } from '../connect'
import { isEffectArray, isEmpty, isNull } from 'check-it-type';

/**
 * @description 创建 表 (Store)
 * @param IDBConfig {IDBConfig}
 * @param data 
 * @returns 
 */
export function createObjectStore(IDBConfig: IDBConfig) {
	const { stores } = IDBConfig
	if (isEmpty(stores)) return;

	openIDB(IDBConfig, {
		error: function (e) {
			console.log('error')
		},
		upgradeNeeded: function (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) {
			const db: IDBDatabase | null = this.result;
			console.log({ db, stores })
			if (isNull(db)) return;
			if (isEffectArray(stores))
				stores.forEach(item => {
					const { storeName, keyPath: pKeyPath = 'id', autoIncrement = false, params = [] } = item || {}
					const objectStore = db.createObjectStore(storeName, { keyPath: pKeyPath, autoIncrement })
					if (isEffectArray(params)) {
						params.forEach(param => {
							const { name, keyPath, multiEntry, unique = false } = param
							objectStore.createIndex(name, keyPath, { unique, multiEntry })
						})
					}
					return
				})
		}
	})
	return;
}