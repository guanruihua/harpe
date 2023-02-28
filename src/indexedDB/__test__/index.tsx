import { isNull } from "check-it-type"
import React, { useEffect, useState } from "react"
import { addDataToDB, IDBConnect, IDBEvent } from '..'

function handleDemo1() {
	addDataToDB('test-db', 'signalChat', {
		// link:'123',
		sequenceId: 'a4',
		messageType: 'string2',
		signalChat: { a: 'aaa1' }
	})
}

export default function () {
	const [name, setName] = useState<string>('test-db')
	useEffect(() => {
		// async function a() {
			IDBConnect('test-db')
			// if (isNull(db)) return;
			// db.transaction(['a'], 'readwrite')
			// console.log(db)
		// }
		// a()
	}, [])
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
			<button onClick={() => { handleDemo1() }}> add </button>
		</div>
	</div >
}
