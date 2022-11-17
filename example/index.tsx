import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { Test } from './components'

// import './cases/classNames.case'
// import './index.less'
// import { TestCookieCmp } from './cookie'
// import { TestStorageCmp } from './storage'

import { TesCSStVariable } from '../src/dom/__test__'

function App() {
	return <div>
		app
		<TesCSStVariable />
		{/* <Test title='Class' /> */}
		{/* <TestCookieCmp /> */}
		{/* <TestStorageCmp /> */}
	</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
