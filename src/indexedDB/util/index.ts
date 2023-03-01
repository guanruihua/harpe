import { EWindow, IDEMonitorEvents } from '../type'

/**
 * @description 获取indexed 对象
 * @returns 
 */
export function getIDBFactory(): IDBFactory {
	const _window: EWindow = window || {}

	//  兼容浏览器
	return _window.indexedDB ||
		_window.mozIndexedDB ||
		_window.webkitIndexedDB ||
		_window.msIndexedDB
}

export function getIDBOpenDBRequest(DBName: string, version = 1): IDBOpenDBRequest {
	return getIDBFactory().open(DBName, version)
}

/**
 * @title IDBMonitor
 * @description  IDBOpenDBRequest 事件监听
 * @param request {IDBOpenDBRequest}
 * @param events {IDEMonitorEvents}
 */
export function IDBMonitor(request: IDBOpenDBRequest, events: IDEMonitorEvents) {
	// 数据库打开成功时候的回调
	if (events.success) request.onsuccess = events.success

	// 数据库打开失败时候的回调
	if (events.error) request.onerror = events.error

	// 数据库有更新时候的回调
	if (events.upgradeNeeded) request.onupgradeneeded = events.upgradeNeeded

	if (events.blocked) request.onblocked = events.blocked

	if (events.addEventListener) request.addEventListener = events.addEventListener
	if (events.removeEventListener) request.removeEventListener = events.removeEventListener


}