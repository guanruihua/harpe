export function getParams(url: string): Record<string, string> {
	try {
		return JSON.parse(
			`{"${decodeURI(url.split("?")[1])
				.replace(/"/g, '\\"')
				.replace(/&/g, '","')
				.replace(/=/g, '":"')}"}`
		)
	} catch (error) {
		return {}
	}
}