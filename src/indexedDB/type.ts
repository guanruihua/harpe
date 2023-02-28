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
	upgradeNeeded?: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any
	addEventListener?: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void
	removeEventListener?: (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void
}