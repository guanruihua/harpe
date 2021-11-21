import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.less'

import { testLocation } from './location'

function App(Props: any) {
	React.useEffect(() => {
		testLocation();
	}, [])
	return <div>React App</div>
}

ReactDOM.render(
	<App />,
	document.getElementById('root'))
