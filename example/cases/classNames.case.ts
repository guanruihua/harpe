import { test } from 'rh-test';
import { classNames } from '../lib';

// test('classNames', classNames,
// )
[
	{ params: [], tobe: '' },
	{ params: ['foo', 'bar'], tobe: 'foo bar' },
	{ params: ['foo', 'bar'], tobe: 'foo bar' },
	{ params: ['foo', { bar: true }], tobe: 'foo bar' },
	{ params: [{ 'foo-bar': true }], tobe: 'foo-bar' },
	{ params: [{ 'foo-bar': false }], tobe: '' },
	{ params: [{ foo: true }, { bar: true }], tobe: 'foo bar' },
	{ params: [{ foo: true, bar: true }], tobe: 'foo bar' },
	{ params: ['foo', { bar: true, duck: false }, 'baz', { quux: true }], tobe: 'foo bar baz quux' },
	{ params: [null, false, 'bar', undefined, 0, 1, { baz: null }, ''], tobe: 'bar 1' },
	{ params: ['a', ['b', { c: true, d: false }]], tobe: 'a b c' },
	{ params: ['foo', 'foo', 'bar'], tobe: 'foo bar' },
	{ params: ['foo', { foo: false, bar: true }], tobe: 'bar' },
].map((item, index) => {
	const { params = [], tobe } = item
	if (classNames(...params) === tobe) {
		return
	}
	console.log(index, params, tobe)
})

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'

var arr = ['b', { c: true, d: false }];
classNames('a', arr); // => 'a b c'

classNames('foo', 'foo', 'bar'); // => 'foo bar'
classNames('foo', { foo: false, bar: true }); // => 'bar'
