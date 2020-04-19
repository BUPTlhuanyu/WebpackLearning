// AsyncSeriesHook为异步串行的执行关系
// 按照插件得注册顺序执行插件，只有在前一个插件执行完成之后，没有错误得情况下才会执行后一个插件
const AsyncSeriesHook = require('../../lib/AsyncSeriesHook')

class Lesson {
	constructor() {
		this.hooks = {
			arch: new AsyncSeriesHook(["name"])
		};
	}
	// 注册监听函数
	tap() {
		this.hooks.arch.tapAsync("node", (name, cb) => {
			setTimeout(() => {
				console.log("node", name);
				cb();
			}, 4000);
		});
		this.hooks.arch.tapAsync("react", (name, cb) => {
			setTimeout(() => {
				console.log("react", name);
				cb();
			}, 1000);
		});
	}
	start() {
		this.hooks.arch.callAsync("musion", function () {
			console.log("end");
		});
	}
}

let l = new Lesson();

// 注册这两个事件
l.tap();
// 启动钩子
l.start();

/**
 * 打印出来的值为：
 * node musion
 * react musion
 * end
 */


// function anonymous(name, _callback) {
// 	"use strict";
// 	var _context;
// 	var _x = this._x;

// 	function _next0() {
// 		var _fn1 = _x[1];
// 		_fn1(name, _err1 => {
// 			if (_err1) {
// 				_callback(_err1);
// 			} else {
// 				_callback();
// 			}
// 		});
// 	}
// 	var _fn0 = _x[0];
// 	_fn0(name, _err0 => {
// 		if (_err0) {
// 			_callback(_err0);
// 		} else {
// 			_next0();
// 		}
// 	});

// }
// node musion
// react musion
// end
