type _ClassNameUnit = Record<string, boolean> | string | false | undefined | null

export type ClassNameUnit = _ClassNameUnit | _ClassNameUnit[]

// export function classNames(...rest: (undefined | string | [string, boolean])[]): string {
export function classNames(...rest: ClassNameUnit[]): string {
	
	const resultArr: unknown[] = rest.map(item => {
		if (!item) { return }
		if (typeof item === 'string') {
			return item
		}
		if (Array.isArray(item) && item.length === 2) {
			if (item[1]) {
				return item[0]
			}
		}
		return
	})

	return resultArr.filter(Boolean).join(' ')

}