/**
 * 关闭数据库
 * @param {object} db 数据库实例
 */
export function closeDB(db: any): void {
	db.close();
	console.log("数据库已关闭");
}