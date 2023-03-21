function doNotify(title, options = {}, events = {}) {
	const notification = new Notification(title, options)
	for (const event in events) {
		notification[event] = events[event]
	}
}

/**
 * @title notify
 * @description 带图带事件的桌面通知
 * @param title {string}
 * @param options {Record<string, string>}
 * @param events {Record<string, function(element:Element):void>}
 * @returns 
 * @example
 ```js
 notify(
	'中奖提示',
	{
		icon: 'https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/f1a9f122e925aeef5e4534ff7f706729~300x300.image',
		body: '恭喜你获得一等奖',
		tag: 'prize'
	},
	{
		onclick(ev) {
			console.log(ev)
			ev.target.close()
			window.focus()
		}
	}
)
 ```
 */
export function notify(title: string, options: Record<string, string> = {}, events: Record<string, any> = {}) {
	if (!('Notification' in window)) {
		return console.error('This browser does not support desktop notification')
	} else if (Notification.permission === 'granted') {
		doNotify(title, options, events)
	} else if (Notification.permission !== 'denied') {
		Notification.requestPermission().then(function (permission) {
			if (permission === 'granted') {
				doNotify(title, options, events)
			}
		})
	}
}
