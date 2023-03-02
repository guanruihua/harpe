/**
 * @title deleteIDB
 * @description 删除数据库
 * @param dbName {string} 数据库名称
 * @returns {IDBOpenDBRequest}
 */
export function deleteIDB(dbName: string): IDBOpenDBRequest {
	const deleteRequest = window.indexedDB.deleteDatabase(dbName)
	deleteRequest.onerror = function (): void {
		console.log("删除失败");
	};
	deleteRequest.onsuccess = function (): void {
		console.log("删除成功");
	};
	return deleteRequest
}