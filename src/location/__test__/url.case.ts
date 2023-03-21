import { test } from 'unit-testing-js';
import { parseQueryString, getQueryString } from '..'

export const parseQueryStringCase = test('parseQueryString', parseQueryString,
	{ param: '', tobe: {} },
	{
		param: 'http://127.0.0.1:5501/CSS/index.html#/css-demo?id=fieldsetgtlegend',
		tobe: { id: 'fieldsetgtlegend' }
	},

)


export const getQueryStringCase = test('getQueryString', getQueryString,
	{
		params: [
			'http://127.0.0.1:5501/CSS/index.html#/css-demo?id=fieldsetgtlegend',
			'id'
		],
		tobe: 'fieldsetgtlegend'
	}
)