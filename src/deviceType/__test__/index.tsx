import { stringify } from "abandonjs"
import React from "react"
import { getDeviceType, isMobile, isDesktop } from '..'

export default function () {
	return <div>
		<h2>deviceType</h2>
		<pre>
			{stringify(getDeviceType(), null, 2)}
		</pre>
		<div>Desktop: {isDesktop().toString()}</div>
		<div>Mobile: {isMobile().toString()}</div>
	</div>
}
