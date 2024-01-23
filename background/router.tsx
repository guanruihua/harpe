
import React, { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

interface _MenuObject extends Record<string, any> {
	name?: string
}

export type MenuObject = RouteObject & _MenuObject

const list = [
	'dom',
	'action',
	'deviceType',
	'cookie',
	'scroll',
	'location',
	'storage',
	'file',
	'encrypt',
].map(name => {
	return {
		name,
		path: '/' + name,
		element: (
			<Suspense fallback={<div>Loading</div>}>
				{React.createElement(lazy(() => import(`../src/${name}/__test__`)))}
			</Suspense>
		)
	}
})

function Home() { return <div>home</div > }

export const menu: MenuObject[] = [
	{
		path: '/',
		element: <Home />
	}
].concat(list)

export const routers: RouteObject[] = Array.from(menu, (item: MenuObject) => ({ path: item.path, element: item.element }))