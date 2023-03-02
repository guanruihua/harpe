import { isNull } from "check-it-type"
import React from "react"
import { addDataToDB, IDBEvent, createObjectStore, deleteIDB, clearIDB } from '..'
import { StringField } from './components'


function handleDemo1() {

}

export default function () {

	const record = {
		DBName: 'db1',
		storeName: 'db2'
	}

	const [msg, setMsg] = React.useState<string>('')

	return <div style={{
		columnCount: 2,
		breakInside: "avoid"
	}}>
		<div style={{ breakInside: "avoid" }}>
			<h2>create</h2>
			<div>
				<StringField
					record={record}
					defaultValue={record.storeName}
					fieldLabel="create DB"
					onClick={(name: string) => {
						createObjectStore({
							IDBName: record.DBName,
							version: 1.1,
							stores: [{
								storeName: name,
								keyPath: 'dbID',
								autoIncrement: true,
								params: [
									{ name: 'a', keyPath: 'a', unique: false },
									{ name: 'b', keyPath: 'b', unique: false },
								]
							}]
						})
					}}
				/>
			</div>
		</div>

		<div style={{ breakInside: "avoid" }}>
			<h2>Add</h2>
			<div>
				<StringField
					fieldLabel="add"
					onClick={() => {
						addDataToDB({ IDBName: record.DBName },
							record.storeName,
							[
								{ a: 3, b: '2', sequenceId: 'a8', link: '123', messageType: 'string6', signalChat: { a: 'aaa1' } },
								// { a: '11', b: 22, sequenceId: 'a9', link: '123', messageType: 'string6', signalChat: { a: 'aaa1' } }
							]
						)
					}}
				/>
			</div>
		</div>
		<div style={{ breakInside: "avoid" }}>
			<h2>delete</h2>
			<div>
				<StringField
					fieldLabel="deleteIDB"
					onClick={(name: string) => deleteIDB(name)}
				/>
			</div>
			<div>
				<StringField
					fieldLabel="clearIDB"
					onClick={(name: string) => clearIDB(record.DBName, name)}
				/>
			</div>
		</div>
		<div style={{ breakInside: "avoid" }}>
			<h2>update</h2>
		</div>
		<div style={{ breakInside: "avoid" }}>
			<h2>select</h2>
			<div>
				<span>{msg}</span>
				<button onClick={() => {

				}}>Count</button>
			</div>
		</div>

	</div >
}
