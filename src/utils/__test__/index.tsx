import React from "react"
import classNamesCase from './classNames.case'
import { parseQueryStringCase } from './url.case'

const list = [
	{
		name: 'classNames',
		result: classNamesCase
	},
	{
		name: 'parseQueryString',
		result: parseQueryStringCase
	}
]

export default function () {
	const [array, setArray] = React.useState<any[]>([])


	React.useEffect(() => {
		const getArray = async () => {
			const newArray: any[] = []
			for (let i = 0; i < list.length; i++) {
				const { result, ...rest }: any = list[i]
				rest.result = await result
				newArray.push(rest)
			}
			return newArray
		}
		(async () => {
			const result = await getArray()
			setArray(result)
		})()
	}, [])

	return <div>
		{array.map(item => {
			const { name, result } = item
			const { ErrorQue = [], SuccessQue = [], WarnningQue = [] } = result
			return <div key={name}>
				<span> {name} </span>
				<span style={{ color: 'green' }}> {SuccessQue.length} </span>
				{ErrorQue.length > 0 && <span style={{ color: 'red' }}> {ErrorQue.length} </span>}
				{WarnningQue.length > 0 && <span style={{ color: 'yellow' }}> {WarnningQue.length} </span>}
			</div>
		})}
	</div>
}
