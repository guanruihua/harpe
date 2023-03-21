import React from "react"
import HelpCmp from './helpCmp'
import { scrollTop } from '..'

export default function () {
	return <div>
		<HelpCmp />
		<button onClick={() => {
			scrollTop()
		}}>To TOP</button>
	</div>
}