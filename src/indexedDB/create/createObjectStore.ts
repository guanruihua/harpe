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
		upgradeNeeded: function (this: IDBOpenDBRequest) {
			const db: IDBDatabase | null = this.result;
			// console.log({ db, stores })
			if (isNull(db)) return;
			if (isEffectArray(stores))
				stores.forEach(item => {
					const { storeName, keyPath: pKeyPath = 'id', autoIncrement = false, params = [] } = item || {}
					// 当前store已经创建
					if (db.objectStoreNames.contains(storeName)) {
						return
					}
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