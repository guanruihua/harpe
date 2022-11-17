import React from "react"
// import './index.css'
import './index.less'
import { addCSSVariable } from '../variable'
// import { Properties } from "_csstype@3.1.1@csstype"
// import { Properties } from "_csstype"
interface Properties<TLength = (string & {}) | 0, TTime = string & {}> { }

export function TesCSStVariable() {

	const [styles, setStyles] = React.useState<Properties>({})

	const [k, setK] = React.useState<string>('1')

	const ref = React.useRef(null)

	return <div>
		TesCSStVariable

		<div key={k} ref={ref} className="test-css-variable">color</div>
		{/* <div key={k} className="test-css-variable" style={styles}>color</div> */}
		{/* <div key={k} className="test-css-variable" style={{ '--color': 'blue' } as Properties<string | number, string & {}>}>color</div> */}
		<button onClick={() => {
			console.log(ref)
			// const dom = document.querySelector('.test-css-variable')
			setStyles({ '--color': 'blue' })
			addCSSVariable(ref.current, '--color', 'green')
			// addCSSVariable(dom, '--color', 'green')
			// setK(k + new Date().getTime().toString)
		}}>to Green</button>
	</div>
}