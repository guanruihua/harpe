import { IDBEvent } from '../type'

export function openDB(DBName: string, callback: (db: IDBDatabase) => void) {
	const db = window.indexedDB.open(DBName, 1)

	db.onsuccess = function (e: IDBEvent) {
		const request = e.target.result
		callback(request)
	}

	return
}