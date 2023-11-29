import { IntersectionHandler, MutationHandler, PerformanceHandler, ResizeHandler } from '..'

// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

const ab = MutationHandler(targetNode, function () {
	console.log('change')
})


// ---------------

const h1Elem: any = document.querySelector('h1');
const pElem: any = document.querySelector('p');
const divElem: any = document.querySelector('body > div');
const slider: any = document.querySelector('input[type="range"]');
const checkbox: any = document.querySelector('input[type="checkbox"]');

divElem.style.width = '600px';

slider.addEventListener('input', () => {
	divElem.style.width = `${slider.value}px`;
})

const resizeObserver = ResizeHandler(divElem, (entries) => {
	for (const entry of entries) {
		if (entry.contentBoxSize) {
			// Firefox implements `contentBoxSize` as a single content rect, rather than an array
			const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

			h1Elem.style.fontSize = `${Math.max(1.5, contentBoxSize.inlineSize / 200)}rem`;
			pElem.style.fontSize = `${Math.max(1, contentBoxSize.inlineSize / 600)}rem`;
		} else {
			h1Elem.style.fontSize = `${Math.max(1.5, entry.contentRect.width / 200)}rem`;
			pElem.style.fontSize = `${Math.max(1, entry.contentRect.width / 600)}rem`;
		}
	}

	console.log('Size changed');
})


checkbox.addEventListener('change', () => {
	if (checkbox.checked) {
		resizeObserver.observe(divElem);
	} else {
		resizeObserver.unobserve(divElem);
	}
});

// ---------------

const observer333 = PerformanceHandler(function (list, obj) {
	var entries = list.getEntries();
	for (var i = 0; i < entries.length; i++) {
		// Process "mark" and "frame" events
	}
}, { entryTypes: ["mark", "frame"] });


// ---------------

const intersectionObserver = IntersectionHandler(
	document.querySelector('.scrollerFooter'),
	(entries) => {
		// 如果 intersectionRatio 为 0，则目标在视野外，
		// 我们不需要做任何事情。
		if (entries[0].intersectionRatio <= 0) return;

		// loadItems(10);
		console.log('Loaded new items');
	});
// 开始监听
// intersectionObserver.observe();

