import React, { Suspense } from "react"
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useNavigate, useRoutes } from 'react-router-dom';
import { routers, menu, MenuObject } from './router'
import './index.less'
import { useEffect } from "react";
import { useState } from "react";

function App() {
	const element = useRoutes(routers)
	const [select, setSelect] = useState<string>('')
	const nav = useNavigate()
	useEffect(() => {
		const names = /(\w+)$/.exec(location.href)
		if (names && names.length) {
			setSelect(names[0])
		}
	}, [])

	return (<div className="main">
		<aside className="menu">
			{menu.map((item: MenuObject) => {
				const { name, path } = item
				if (path && path !== '/') {
					return <div
						className={select === name ? 'isSelect' : ''}
						key={name + path}
						onClick={() => {
							nav(path)
							name && setSelect(name)
						}}
					>{name || path.replace('/', '')}
					</div>
				}
			})}
		</aside>
		<div className="docs-component-content">
			<Suspense fallback={<div>loading...</div>}>
				<div>{element}</div>
			</Suspense>
		</div>
	</div>
	)
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<BrowserRouter basename="/">
		<App />
	</BrowserRouter>
);
