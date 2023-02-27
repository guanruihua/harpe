/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
export function getDataByKey(db: any, storeName: string, key: any) {
	return new Promise((resolve, reject): void => {
		const transaction = db.transaction([storeName]); // 事务
		const objectStore = transaction.objectStore(storeName); // 仓库对象
		const request = objectStore.get(key); // 通过主键获取数据

		request.onerror = function (): void {
			console.log("事务失败");
		};

		request.onsuccess = function (): void {
			console.log("主键查询结果: ", request.result);
			resolve(request.result);
		};
	});
}