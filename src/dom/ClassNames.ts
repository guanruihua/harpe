import { type } from 'rh-js-methods'
type FalseValue = null | undefined | 0

type _ClassNameUnit = Record<string, boolean | FalseValue> | string | undefined | null | number | boolean

export type ClassNameUnit = _ClassNameUnit | _ClassNameUnit[]

export function classNames(...rest: ClassNameUnit[]): string {

	// 结果数组
	const resultSet = new Set<string | number>()

	// 结果取舍
	const choicesMap: Record<string, boolean> = {}

	function checkValid(itemFlag: boolean, key: string) {
		if (itemFlag === false && resultSet.has(key)) {
			resultSet.delete(key)
		}
		if (itemFlag === true && !resultSet.has(key)) {
			resultSet.add(key)
		}
	}

	function forEachData(list: ClassNameUnit[]) {
		list.forEach(item => {

			if (!item) return

			if (Array.isArray(item)) return forEachData(item)

			if (typeof item === 'string' || typeof item === 'number') {
				resultSet.add(item)
				return
			}

			if (type(item) === 'Object') {
				for (let key in item as Record<string, any>) {
					const itemFlag = !!item[key]
					choicesMap[key] = itemFlag
					checkValid(itemFlag, key)
				}
				return
			}
		})
	}

	forEachData(rest)


	for (let key in choicesMap as Record<string, any>) {
		checkValid(choicesMap[key], key)
	}

	return [...resultSet].join(' ')
}
