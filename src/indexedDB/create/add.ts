import { message } from '../common'
import { IDBEvent } from '../type'
import { openDB } from '../connect'
/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function addDataToDB(DBName: string, storeName: string, data: any): void {

	openDB(DBName, (e: IDBDatabase) => {
		const request = e
			.transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
			.objectStore(storeName) // 仓库对象
			.add(data)

		request.onsuccess = function (): void {
			console.log(message.writeSuccess)
		};

		request.onerror = function (): void {
			console.log(message.writeError)
		};
	})
}