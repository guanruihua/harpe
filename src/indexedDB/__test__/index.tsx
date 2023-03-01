import { isNull } from "check-it-type"
import React, { useEffect, useState } from "react"
import { addDataToDB, IDBConnect, IDBEvent, createObjectStore } from '..'

function handleDemo1() {
	addDataToDB({ IDBName: 'test-db3' },
		// 'signalChat',
		'db2',
		[
			{
				a: 1,
				b: '2',
				// sequenceId: 'a8',
				// link: '123',
				// messageType: 'string6',
				// signalChat: { a: 'aaa1' }
			}, {
				a: '11',
				b: 22,
				// sequenceId: 'a9',
				// link: '123',
				// messageType: 'string6',
				// signalChat: { a: 'aaa1' }
			}
		]
	)
}

export default function () {
	const [name, setName] = useState<string>('test-db2')

	// useEffect(() => { 
	// 	IDBConnect('test-db')
	// }, [])

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
					// IDBConnect(name)
					createObjectStore({
						IDBName: name,
						version: 1.1,
						stores: [{
							storeName: 'db2',
							keyPath: 'dbID',
							autoIncrement: true,
							params: [
								{ name: 'a', keyPath: 'a', unique: true },
								{ name: 'b', keyPath: 'b', unique: false },
							]
						}]
					})
				}}>create / connect DB</button>
			</div>
		</div>
		<h2>Add</h2>
		<div>
			<input type="text" />
			<button onClick={() => { handleDemo1() }}> add </button>
		</div>
	</div >
}
