import * as _cookie from './cookie'
import * as _utils from './utils'
import * as _location from './location'
import * as _indexDB from './indexDB'
import * as _hook from './hook'

const RH: any = Object.assign(
	_cookie,
	_utils,
	_location,
	_indexDB
);

export {
	_location,
	_cookie,
	_utils,
	_hook,
	RH,
}