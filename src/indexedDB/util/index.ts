import { EWindow, IDEMonitorEvents } from '../type'

export function getIDBFactory(): IDBFactory {
	const _window: EWindow = window || {}

	//  兼容浏览器
	return _window.indexedDB ||
		_window.mozIndexedDB ||
		_window.webkitIndexedDB ||
		_window.msIndexedDB
}


export function IDEMonitor(request: IDBOpenDBRequest, event: IDEMonitorEvents) {
	if (event.success) request.onsuccess = event.success
	if (event.error) request.onerror = event.error
	// if(event.upgradeNeeded) request.onupgradeneeded = event.upgradeNeeded
	if (event.blocked) request.onblocked = event.blocked
}