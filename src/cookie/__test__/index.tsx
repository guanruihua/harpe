import React, { useEffect, useState } from "react"
import { getCookie, setCookie } from '..'

export default function () {
	const [value, setValue] = useState<string>('')
	useEffect(() => {
		setCookie('keyA', 'a--key--value--')
		setCookie('keyB', 'b--key--value--')
		setCookie('keyB', 1)
	}, [])

	useEffect(() => {
		const value = getCookie<string>('keyA')
		// console.log(value, type(value))
		setValue(value || '')
	}, [value])

	return <div>
		<h3>cookie</h3>
		<div>
			value: {value}
		</div>
	</div>
}
