import { ObjectType } from "abandonjs"

export type EWindow = Window & Record<string, any>

export interface IDBConnectConfig extends ObjectType  {
	/**
	 * @default 1
	 */
	version?: number
} 

export type IDBEvent = Event & {
	srcElement: IDBOpenDBRequest
	target: IDBOpenDBRequest
}