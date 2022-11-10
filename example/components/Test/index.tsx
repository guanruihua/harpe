import React from "react"
import { classNames } from "../../lib"
import styles from './index.module.less'

export interface TestProps {
	title: string
	success?: number
	warning?: number
	error?: number
	[key: string]: any
}

export function Test(props: TestProps) {
	const { title, success, warning, error } = props
	return <div className={classNames(styles.test, { success, warning, error })}>
		{title}
	</div>
}
