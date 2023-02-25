import React from "react"
import CopyCmm from './copy'
import StopCmm from './banConsole'
import { getUrlParams } from '..'

export default () => {
	console.log(getUrlParams('/?a=123&b=c'))
	return <div>
		<StopCmm />
		<CopyCmm />
	</div>
}
