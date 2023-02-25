import React from "react"
import { copyText } from '../copy'

export default function () {
	return <div>
		<h2 style={{ marginBottom: 10 }}>copy</h2>
		<div>
			<pre>123123123123 </pre>
			<button onClick={() => {
				console.log('copy text')
				copyText('123123123123')
			}}>copy text</button>
		</div>
		<textarea style={{ width: '100%', minHeight: 300 }} />
	</div>
}
