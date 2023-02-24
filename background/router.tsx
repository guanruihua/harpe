
import React, { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import { Sandpack } from "@codesandbox/sandpack-react"

function App() {
	return (
		<Sandpack
			template="react"
			customSetup={{
				dependencies: {
					"react-markdown": "latest"
				}
			}}
			files={{
				"/App.js": `import ReactMarkdown from 'react-markdown' 

export default function App() {
  return (
    <ReactMarkdown>
      # Hello, *world*!
    </ReactMarkdown>
  )
}`
			}}
		/>
	)
};
interface _MenuObject extends Record<string, any> {
	name?: string
}

export type MenuObject = RouteObject & _MenuObject

const list = [
	'scroll',
	'utils',
].map(name => {
	return {
		name,
		path: '/' + name,
		element: <Suspense fallback={<div>Loading</div>}>
			{React.createElement(lazy(() => import(`../src/${name}/__test__`)))}
		</Suspense>
	}
})

export const menu: MenuObject[] = [
	{
		path: '/',
		element: (() => <div>home</div >) as any
	},
	{
		name: 'Sandpack',
		path: '/sandpack',
		// element: () => <div>Sandpack</div>
		element: <Suspense fallback={<div>Loading</div>}>
			<App />
		</Suspense>
	}
].concat(list)

export const routers: RouteObject[] = Array.from(menu, (item: MenuObject) => ({ path: item.path, element: item.element }))