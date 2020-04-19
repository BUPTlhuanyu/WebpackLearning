const SyncWaterfallHook = require('../../lib/SyncWaterfallHook')

// waterfall 瀑布 上面会影响下面的

class Lesson {
	constructor() {
		this.hooks = {
			arch: new SyncWaterfallHook(["name"])
		};
	}
	// 注册监听函数
	tap() {
		this.hooks.arch.tap("node", function (name) {
			console.log("node", name);
			return "node学得还不错";
		});
		this.hooks.arch.tap("react", function (data) {
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


// function anonymous(name
//     ) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     var _result0 = _fn0(name);
//     if(_result0 !== undefined) {
//     name = _result0;
//     }
//     var _fn1 = _x[1];
//     var _result1 = _fn1(name);
//     if(_result1 !== undefined) {
//     name = _result1;
//     }
//     return name;

//     }

// node musion
// react node学得还不错
