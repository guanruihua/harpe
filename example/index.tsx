import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './cases/classNames.case'
// import '@/index'
import './index.less'
// import { TestIndexDB } from './indexDB'
// import { testLocation } from './location'

// Usage
// function App2() {
// 	// Call the hook which returns, current value and the toggler function
// 	const [isTextChanged, setIsTextChanged] = useBoolean();

// 	return (
// 		<button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
// 	);
// }


function App(Props: any) {
	// React.useEffect(() => {
	// testLocation();
	// }, [])
	return <div>
		React App
		{/* <App2 /> */}
		{/* <TestIndexDB /> */}
	</div>
}

ReactDOM.render(
	<App />,
	document.getElementById('root'))
