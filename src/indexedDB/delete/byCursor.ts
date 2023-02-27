/**
 * 通过索引和游标删除指定的数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名
 * @param {object} indexValue 索引值
 */
export function deleteByCursor(db: any, storeName: string, indexName: string, indexValue: any): void {
	const store: any = db.transaction(storeName, "readwrite").objectStore(storeName);
	const request: any = store
		.index(indexName) // 索引对象
		.openCursor(IDBKeyRange.only(indexValue)); // 指针对象
	request.onsuccess = function (e: any): void {
		const cursor = e.target.result;
		let deleteRequest;
		if (cursor) {
			deleteRequest = cursor.delete(); // 请求删除当前项
			deleteRequest.onerror = function (): void {
				console.log("游标删除该记录失败");
			};
			deleteRequest.onsuccess = function (): void {
				console.log("游标删除该记录成功");
			};
			cursor.continue();
		}
	};
	request.onerror = function (e: any): void {
		console.error('事务失败')
	};
}