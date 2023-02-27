/**
 * 通过索引读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} indexName 索引名称
 * @param {string} indexValue 索引值
 */
export function selectByIndex(db, storeName, indexName, indexValue) {
	const store = db.transaction(storeName, "readwrite").objectStore(storeName);
	const request = store.index(indexName).get(indexValue)
	request.onerror = function () {
		console.log("事务失败")
	};
	request.onsuccess = function (e) {
		const result = e.target.result
		console.log("索引查询结果：", result)
	};
}