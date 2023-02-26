import { test } from 'unit-testing-js';
import { classNames } from '..'

export default test('classNames', classNames,
	{ params: [], tobe: '' },
	{ params: ['foo'], tobe: 'foo' },
	{ params: ['foo', 1], tobe: 'foo 1' },
	{ params: ['foo', 'bar'], tobe: 'foo bar' },
	{ params: ['foo', 'bar', ['aside']], tobe: 'foo bar aside' },
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
);
