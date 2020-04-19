const Sync = require('../../lib/SyncHook')

class Lesson {
	constructor() {
		this.hooks = {
			// 这里传入的数组每一项都是tap时传入函数的参数名称
			arch: new Sync(["x"])
		}
	}
	tap() {
		// 这里即便传入的是两个参数，但是new Sync只有一个，因此call的时候，即便传入两个，也只有第一个会被传入tap
		this.hooks.arch.tap('node', function (name, r) {
			console.log("node", name, r)
		})
		this.hooks.arch.tap('react', function (name, r) {
			console.log("react", name, r)
		})
	}
	start1() {
		// 这里只有第一个参数是有效的，第二个参数是无法传入tab的函数中
		this.hooks.arch.call("sync", "a");
	}
	start2() {
		this.hooks.arch.callAsync("async", function () {
			console.log('end')
		})
	}
	start3() {
		this.hooks.arch.promise("promise", function () {
			console.log('end')
		})
	}
}

let l = new Lesson();

l.tap()

// l.start1()

// function anonymous(x
//     ) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     _fn0(x);
//     var _fn1 = _x[1];
//     _fn1(x);

//     }

// 结果
//     node sync undefined
//     react sync undefined

// l.start2()

// function anonymous(x, _callback) {
// 	"use strict";
// 	var _context;
// 	var _x = this._x;
// 	var _fn0 = _x[0];
// 	var _hasError0 = false;
// 	try {
// 		_fn0(x);
// 	} catch (_err) {
// 		_hasError0 = true;
// 		_callback(_err);
// 	}
// 	if (!_hasError0) {
// 		var _fn1 = _x[1];
// 		var _hasError1 = false;
// 		try {
// 			_fn1(x);
// 		} catch (_err) {
// 			_hasError1 = true;
// 			_callback(_err);
// 		}
// 		if (!_hasError1) {
// 			_callback();
// 		}
// 	}

// }
// node sync undefined
// react sync undefined
// end

l.start3()

// function anonymous(x) {
// 	"use strict";
// 	return new Promise((_resolve, _reject) => {
// 		var _sync = true;

// 		function _error(_err) {
// 			if (_sync)
// 				_resolve(Promise.resolve().then(() => {
// 					throw _err;
// 				}));
// 			else
// 				_reject(_err);
// 		};
// 		var _context;
// 		var _x = this._x;
// 		var _fn0 = _x[0];
// 		var _hasError0 = false;
// 		try {
// 			_fn0(x);
// 		} catch (_err) {
// 			_hasError0 = true;
// 			_error(_err);
// 		}
// 		if (!_hasError0) {
// 			var _fn1 = _x[1];
// 			var _hasError1 = false;
// 			try {
// 				_fn1(x);
// 			} catch (_err) {
// 				_hasError1 = true;
// 				_error(_err);
// 			}
// 			if (!_hasError1) {
// 				_resolve();
// 			}
// 		}
// 		_sync = false;
// 	});

// }
// node promise undefined
// react promise undefined
