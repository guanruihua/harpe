import { isNull } from "check-it-type"
import React, { useEffect, useState } from "react"
import { addDataToDB, IDBConnect, IDBEvent } from '..'

function handleDemo1() {
	const req = window.indexedDB.open('test-db', 1)
	// const req = window.indexedDB.open('signalChat', 1)
	console.log(req)
	if (req) {
		req.onsuccess = function (e: IDBEvent): void {
			addDataToDB(e.target.result, 'signalChat', {
				signalChat: { a: 'aaa1' }
			})
		}
	}
}


export default function () {
	const [name, setName] = useState<string>('test-db')
	// let db:IDBDatabase|null = null
	// const [db, setDB] = useState<IDBDatabase | null>(null)
	useEffect(() => {
		(async () => {
			const db = await IDBConnect('test-db')
			// setDB(db)
			console.log(db)
		})()
	}, [])
	// if (isNull(db)) return <div>loading</div>
	return <div>
		<h1>indexedDB</h1>
		<div>
			<div>
				<input
					defaultValue={name}
					onChange={(e) => {
						setName(e.target.value)
					}}
				/>
				<button onClick={() => {
					IDBConnect(name)
				}}>create / connect DB</button>
			</div>
		</div>
		<h2>Add</h2>
		<div>
			<input type="text" />
			<button onClick={() => {
				console.log('add')
				// addDataToDB(db, 'signalChat', 'aaa1')
				// addDataToDB(db, 'test-db', {
				// window.indexedDB.deleteDatabase('test-db')
				handleDemo1()
				// addDataToDB(db, 'test-db', 'aaa1')
			}}> add </button>
		</div>
	</div >
}
