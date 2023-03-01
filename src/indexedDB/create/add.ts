import { IDBConfig, IDBEvent } from '../type'
import { openIDB } from '../connect'
import { isEffectArray, isEmpty, isObject } from 'check-it-type'
import { ObjectType } from 'abandonjs';

/**
 * @description 新增数据 到 IDB 中
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function addDataToDB(IDBConfig: IDBConfig, storeName: string, data: ObjectType | ObjectType[]): void {
	if (isEmpty(storeName)) return;

	openIDB(IDBConfig, {
		success: (e: IDBEvent) => {
			const request = e.target.result
			if (isObject(data)) {
				request.transaction([storeName], "readwrite").objectStore(storeName).add(data)
				return;
			}
			if (isEffectArray(data)) {
				data.forEach(item =>
					request.transaction([storeName], "readwrite").objectStore(storeName).add(item)
				)
				return;
			}
		}
	})
}