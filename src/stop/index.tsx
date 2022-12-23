// 6. 禁用在浏览器打开控制台

const check = function () {
	function doCheck(a) {
		// if (['' + a / a]('length') !== 1 || a % 20 === 0) {
		//   ;(function () {}['constructor']('debugger')())
		// } else {
		//   ;(function () {}['constructor']('debugger')())
		// }
		doCheck(++a)
	}

	try {
		doCheck(0)
	} catch (err) {
		console.error(err)
	}
}
// check()

setInterval(function () {
	check()
}, 4000)