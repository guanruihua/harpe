// 14.docx文件转html
// 部分样式无法实现，所以最好还是后端去实现，后端的比较成熟，这里用vue来演示
// 需要安装插件mammoth
// npm install mammoth--save

{/* 
< input type = "file" name = "file" @change="changeFile" />
<div id="wordView" v-html="wordText" /> 
*/}

// import mammoth from "mammoth"

const mammoth = {}
//选择本地文件预览
function changeFile(event) {
	// if(event.target.files[0].name.indexOf('docx')>-1){
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const _this = this;
	let file = event.target.files[0];
	let reader = new FileReader();
	reader.onload = function (loadEvent) {
		let arrayBuffer = loadEvent.target.result; //arrayBuffer
		mammoth
			.convertToHtml({ arrayBuffer: arrayBuffer })
			// .convertToMarkdown({ arrayBuffer: arrayBuffer })
			.then(_this.displayResult)
			.done();
	};
	reader.readAsArrayBuffer(file);
	// }
}
//页面渲染
function displayResult(result) {
	console.log(result.value)
	this.wordText = result.value;
}


// 1. 复制内容到剪切板
// 该方法使用 navigator.clipboard.writeText 来实现将文本复制到剪贴板：
const copyToClipboard = (text) => navigator.clipboard.writeText(text);

copyToClipboard("Hello World");

// 2. 清除所有cookie
// 该方法可以通过使用 document.cookie 来访问 cookie 并清除存储在网页中的所有 cookie：
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`));

// 3. 获取选中的文本
// 该方法通过内置的 getSelection 属性获取用户选择的文本：
const getSelectedText = () => window.getSelection().toString();

getSelectedText();

// 4. 检测是否是黑暗模式
// 该方法用于检测当前的环境是否是黑暗模式，它是一个布尔值：
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
console.log(isDarkMode)

// 15.验证'()'是否成对出现
;[..."(())()(()())"].reduce((a,i)=> i === '(' ? a+1 : a-1 , 0);
// 输出0则是

// 10. 打开浏览器打印框
// 该方法用于打开浏览器的打印框：
const showPrintDialog = () => window.print()

// 9. 重定向到一个URL
// 该方法用于重定向到一个新的URL：
const redirect = url => location.href = url

redirect("https://www.google.com/")

// 4. 带图带事件的桌面通知
function doNotify(title, options = {}, events = {}) {
	const notification = new Notification(title, options)
	for (let event in events) {
		notification[event] = events[event]
	}
}

// 16.判断当前标签页是否激活
const isTabInView = () => !document.hidden

function notify(title, options = {}, events = {}) {
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
notify(
	'中奖提示',
	{
		icon: 'https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/f1a9f122e925aeef5e4534ff7f706729~300x300.image',
		body: '恭喜你，掘金签到一等奖',
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

	// 10. 禁止右键、选择、复制
	;['contextmenu', 'selectstart', 'copy'].forEach(function (ev) {
		document.addEventListener(ev, function (event) {
			return (event.returnValue = false)
		})
	})
