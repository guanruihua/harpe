export const EmptyObserver = {
	// eslint-disable-next-line
	observe: (target: HTMLElement | null, options?: MutationObserverInit | ResizeObserverOptions) => { return },
	// eslint-disable-next-line
	unobserve: (target: HTMLElement | null) => { return },
	// eslint-disable-next-line
	disconnect: () => { return },
	takeRecords: () => { return [] }
}