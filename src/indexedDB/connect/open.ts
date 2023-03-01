import { IDBConfig, IDEMonitorEvents } from '../type'
import { IDBMonitor } from '../util'

export function openIDB(
	IDBConfig: IDBConfig,
	events: IDEMonitorEvents = {},
): void {
	const { IDBName, version = 1 } = IDBConfig
	const db = window.indexedDB.open(IDBName, version)
	IDBMonitor(db, events)
}