/**
 * 通过索引和游标查询记录
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
export function cursorGetDataByIndex(db: any, storeName: string, indexName: any, indexValue: any): void {
	const list: any[] = [];
	const store: any = db.transaction(storeName, "readwrite").objectStore(storeName); // 仓库对象
	const request: any = store
		.index(indexName) // 索引对象
		.openCursor(IDBKeyRange.only(indexValue)); // 指针对象
	request.onsuccess = function (e: any): void {
		const cursor: any = e.target.result;
		if (cursor) {
			// 必须要检查
			list.push(cursor.value);
			cursor.continue(); // 遍历了存储对象中的所有内容
		} else {
			console.log("游标索引查询结果：", list);
		}
	};
	request.onerror = function (e): void {
		console.log(' 事务失败')
	};
}