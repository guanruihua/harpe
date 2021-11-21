import * as _cookie from './cookie'
import * as _utils from './utils'
import * as _location from './location'

const RH: any = Object.assign(
	_cookie,
	_utils,
	_location
);

export {
	_location,
	_cookie,
	_utils,
	RH,
}