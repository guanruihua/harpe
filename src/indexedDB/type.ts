import { ObjectType } from "abandonjs"

export type EWindow = Window & Record<string, any>

export interface IDBConnectConfig extends ObjectType {
	/**
	 * @default 1
	 */
	version?: number
}

export type IDBEvent = Event & {
	srcElement: IDBOpenDBRequest
	target: IDBOpenDBRequest
}

export type IDEMonitorEvent = (event: IDBEvent) => void

export interface IDEMonitorEvents {
	error?: IDEMonitorEvent
	success?: IDEMonitorEvent
	blocked?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any
	// 数据库创建或升级的时候会触发
	upgradeNeeded?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any
	addEventListener?: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void
	removeEventListener?: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void
}

// 存储库
export interface IDBStore {
	storeName: string

	/**
		 * @default id
		 * @description 主键
		 */
	keyPath: string
	/**
	 * @default false
	 * @description 自增
	 */
	autoIncrement?: boolean
	params?: {
		name: string
		keyPath: string
		multiEntry?: boolean;
		/**
		 * @description 唯一
		 */
		unique?: boolean;
	}[]
}


export interface IDBConfig {
	IDBName: string
	/**
	 * @default 1
	 */
	version?: number
	stores?: IDBStore | IDBStore[]
}