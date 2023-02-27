
/**
 * 通过游标读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 */
export function selectByCursor(db: any, storeName: string): void {
	const list: any[] = [];
	const store: any = db
		.transaction(storeName, "readwrite") // 事务
		.objectStore(storeName); // 仓库对象
	const request = store.openCursor(); // 指针对象
	// 游标开启成功，逐行读数据
	request.onsuccess = function (e) {
		const cursor = e.target.result;
		if (cursor) {
			// 必须要检查
			list.push(cursor.value);
			cursor.continue(); // 遍历了存储对象中的所有内容
		} else {
			console.log("游标读取的数据：", list);
		}
	};
}
