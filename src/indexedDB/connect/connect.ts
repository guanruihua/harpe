import { isNull } from 'check-it-type'
import type { IDBConnectConfig, IDBEvent } from '../type'
import { message } from '../common'
import { getIDBFactory } from '../util'

/**
 * 打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
export function IDBConnect(dbName: string, config?: IDBConnectConfig) {
	const {
		version = 1,
		keyPath = 'sequenceId',
		autoIncrement = true
	} = config || {}


	let db: IDBDatabase | null = null;
	// 打开数据库，若没有则会创建
	const request: IDBOpenDBRequest = getIDBFactory().open(dbName, version)
	// 数据库打开成功回调
	request.onsuccess = function (event: IDBEvent): void {
		db = event.target.result; // 数据库对象
		console.info(message.openSuccess);
		console.log({ request, db })
	};

	// 数据库打开失败的回调
	request.onerror = function (event: IDBEvent): void {
		console.log(message.openError);
	};
	
	// 数据库有更新时候的回调
	request.onupgradeneeded = function (event: any): void {
		console.log(event)
		// 数据库创建或升级的时候会触发
		console.log(message.dbUpdate);
		db = event.target.result; // 数据库对象
		if (isNull(db)) return;
		// 创建存储库
		const objectStore = db.createObjectStore("signalChat", {
			keyPath: "sequenceId", // 这是主键
			// autoIncrement: true // 实现自增
		});
		// 创建索引，在后面查询数据的时候可以根据索引查
		objectStore.createIndex("link", "link", { unique: false });
		objectStore.createIndex("sequenceId", "sequenceId", { unique: false });
		objectStore.createIndex("messageType", "messageType", { unique: false });
	};
}