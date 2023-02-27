/**
 * 通过主键删除数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} id 主键值
 */
export function deleteDB(db: any, storeName, id) {
	const request: any = db
		.transaction([storeName], "readwrite")
		.objectStore(storeName)
		.delete(id);

	request.onsuccess = function () {
		console.log("数据删除成功");
	};

	request.onerror = function () {
		console.log("数据删除失败");
	};
}

/**
/ /  * 删除数据库
 * @param {object} dbName 数据库名称
 */
export function deleteDBAll(dbName: string): void {
	console.log(dbName);
	const deleteRequest = window.indexedDB.deleteDatabase(dbName)
	deleteRequest.onerror = function (event: any): void {
		console.log("删除失败");
	};
	deleteRequest.onsuccess = function (event: any): void {
		console.log("删除成功");
	};
}