import React from "react"
import CopyCmm from './copy'
import StopCmm from './banConsole'
import { WatchHref } from './watchHref'
import { getUrlParams } from '..'

export default () => {
	console.log(getUrlParams('/?a=123&b=c'))
	return <div>
		<WatchHref />
		<StopCmm />
		<CopyCmm />
	</div>
}
