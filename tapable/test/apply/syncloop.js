// SyncLoopHook为同步循环的执行关系，当监听函数被触发的时候，
// 会依次执行插件，如果某个插件返回的结果不是undefined则从第一个插件开始依次循环执行，
// 如果每一个插件的结果都是undefined则结束循环
// 循环遍历插件队列相当于只有一条命的闯关游戏，一旦挂了（结果不是undefined），就得从头开始（从头开始循环执行插件）。
const SyncLoopHook = require('../../lib/SyncLoopHook')

class Lesson {
	constructor() {
		this.index = 0;
		this.hooks = {
			arch: new SyncLoopHook(["name"])
		};
	}
	// 注册监听函数
	tap() {
		this.hooks.arch.tap("node", name => {
			console.log("node", name);
			return ++this.index === 3 ? undefined : "继续学";
		});
		this.hooks.arch.tap("react", data => {
			console.log("react", data);
		});
	}
	start() {
		this.hooks.arch.call("musion");
	}
}

let l = new Lesson();

// 注册这两个事件
l.tap();
// 启动钩子
l.start();


function anonymous(name) {
	"use strict";
	var _context;
	var _x = this._x;
	var _loop;
	do {
		_loop = false;
		var _fn0 = _x[0];
		var _result0 = _fn0(name);
		if (_result0 !== undefined) {
			_loop = true;
		} else {
			var _fn1 = _x[1];
			var _result1 = _fn1(name);
			if (_result1 !== undefined) {
				_loop = true;
			} else {
				if (!_loop) {}
			}
		}
	} while (_loop);
}
// node musion
// node musion
// node musion
// react musion
