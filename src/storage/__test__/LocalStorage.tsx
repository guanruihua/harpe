import React from "react"
import { ArrayField, ObjectField, StringField } from 'unit-testing-react'
import { localStorageClass } from '..'

export default function () {
	return <div>
		<h2>LocalStorage</h2>
		<StringField
			defaultValue={localStorageClass.getString('ls-a1')}
			onClick={(value: string) => {
				localStorageClass.setItem('ls-a1', value)
				return value
			}} />
		<ArrayField
			defaultValue={localStorageClass.getArray('ls-b1')}
			fields={[
				{ name: 'b1', type: 'number' },
				{ name: 'b2', type: 'string' },
			]}
			onClick={(value) => {
				localStorageClass.setItem('ls-b1', value)
			}}
		/>
		<ObjectField
			defaultValue={localStorageClass.getObject('ls-c1')}
			fields={[
				{ name: 'a' },
				{ name: 'b' },
			]}
			onClick={(value) => {
				localStorageClass.setItem('ls-c1', value)
			}}
		/>
	</div>
}
