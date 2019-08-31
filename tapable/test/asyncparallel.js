const AsyncParallelHook = require('../lib/AsyncParallelHook')
// 所有异步插件都执行完成之后，执行call中得回调函数
// 异步的钩子分为串行和并行
// 串行：第一个异步执行完，才会执行第二个
// 并行：需要等待所有并发的异步事件执行后再执行回调方法
// 实现得思路：通过一个计数器来控制异步并行问题，比如3个异步请求，则计数器初始值为3，完成一个计数器就减一
// 这个计数器作为闭包中不会被gc得一个变量
// 关键词：闭包，计数器，异步，并发执行

// 注册方法： tap注册 tapAsync注册

class Lesson {
	constructor() {
		this.hooks = {
			arch: new AsyncParallelHook(["name"])
		};
	}
	// 注册监听函数
	tap() {
		this.hooks.arch.tapAsync("node", (name, cb) => {
			setTimeout(() => {
				console.log("node", name);
				cb();
			}, 2000);
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
// 	do {
// 		var _counter = 2;
// 		var _done = () => {
// 			_callback();
// 		};
// 		if (_counter <= 0) break;
// 		var _fn0 = _x[0];
// 		_fn0(name, _err0 => {
// 			if (_err0) {
// 				if (_counter > 0) {
// 					_callback(_err0);
// 					_counter = 0;
// 				}
// 			} else {
// 				if (--_counter === 0) _done();
// 			}
// 		});
// 		if (_counter <= 0) break;
// 		var _fn1 = _x[1];
// 		_fn1(name, _err1 => {
// 			if (_err1) {
// 				if (_counter > 0) {
// 					_callback(_err1);
// 					_counter = 0;
// 				}
// 			} else {
// 				if (--_counter === 0) _done();
// 			}
// 		});
// 	} while (false);

// }
// node musion
// react musion
// end
