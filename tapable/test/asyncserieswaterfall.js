// AsyncSeriesWaterfallHook为异步串行的执行关系，上一个监听函数的中的callback(err, data)的第二个参数,可以作为下一个监听函数的参数
// 实现原理关键词： 闭包，回调，异步
const AsyncSeriesWaterfallHook = require('../lib/AsyncSeriesWaterfallHook')
let hook = new AsyncSeriesWaterfallHook(["name"]);

hook.tapAsync("react", function (name, cb) {
	setTimeout(() => {
		console.log("react", name);
		cb(null, "传给下一个插件");
	}, 3000);
});
hook.tapAsync("node", function (name, cb) {
	setTimeout(() => {
		console.log("node", name);
		cb(null);
	}, 1000);
});
hook.callAsync("musion", function () {
	console.log("end");
});

/**
 * 打印出来的值为：
 * node musion
 * end
 */

// _fn1(name, (_err1, _result1) => {
// 	if (_err1) {
// 		_callback(_err1);
// 	} else {
// 		if (_result1 !== undefined) {
// 			name = _result1;
// 		}
// 		_callback(null, name);
// 	}
// });

// function (name, cb) {
// 	setTimeout(() => {
// 		console.log("node", name);
// 		cb(null);
// 	}, 1000);
// }
// 对比上面得两个，_fn1就是下面得函数，上面得函数就是在执行下面的函数
// 传入的值与参数的对应关系为：name对应name，(_err1, _result1)=>{}就是这里的cb


// function anonymous(name, _callback) {
// 	"use strict";
// 	var _context;
// 	var _x = this._x;

// 	function _next0() {
// 		var _fn1 = _x[1];
// 		_fn1(name, (_err1, _result1) => {
// 			if (_err1) {
// 				_callback(_err1);
// 			} else {
// 				if (_result1 !== undefined) {
// 					name = _result1;
// 				}
// 				_callback(null, name);
// 			}
// 		});
// 	}
// 	var _fn0 = _x[0];
// 	_fn0(name, (_err0, _result0) => {
// 		if (_err0) {
// 			_callback(_err0);
// 		} else {
// 			if (_result0 !== undefined) {
// 				name = _result0;
// 			}
// 			_next0();
// 		}
// 	});

// }
// react musion
// node 传给下一个插件
// end
