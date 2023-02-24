declare module '*.module.less' {
	const resource: { [key: string]: string };
	export = resource;
}

declare module '*.less' {
	const resource: { [key: string]: string };
	export = resource;
}

declare module '@codesandbox/*'
declare module "@codesandbox/sandpack-react"
declare module '*.css' 