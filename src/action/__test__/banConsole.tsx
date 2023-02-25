import React from "react"
import { banConsole, notBanConsole } from '..'

export default function () {
	return <div>
		<h2>stop</h2>
		<div>
			<button onClick={() => { notBanConsole() }}>start</button>
			<button onClick={() => { banConsole() }}>ban</button>
		</div>
	</div>
}
