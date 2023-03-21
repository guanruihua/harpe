import React from "react"

const list = new Array(100).fill('I am a line of content')

export default function HelpCmp() {
	return <div>
		{list.map((item, index) => <div key={String(index)}>{index + '  ' + item}</div>)}
	</div>
}