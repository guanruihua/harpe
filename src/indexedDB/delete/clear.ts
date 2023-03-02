import { isNull } from "check-it-type"
import { IDBEvent } from "indexedDB/type"
import { getIDBOpenDBRequest } from "../util"

/**
 * @title clearIDB
 * @description 删除数据库
 * @param dbName {string} 数据库名称
 * @returns {IDBOpenDBRequest}
 */
export function clearIDB(DBName: string, storeName: string, version = 1): IDBOpenDBRequest | undefined {
	const request = getIDBOpenDBRequest(DBName, version)
	if (isNull(request)) return;


	// window.indexedDB.deleteDatabase(dbName)
	// request.onerror = function (): void {
	// 	console.log("删除失败");
	// };
	request.onsuccess = function (e:IDBEvent): void {

		// request.transaction([storeName], 'readwrite').objectStore(storeName)
		console.log("清空成功");
	};
	return request
}