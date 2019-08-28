const syncbail = require('../lib/SyncBailHook')

class Lesson {
	constructor() {
		this.hooks = {
			arch: new syncbail(["x"])
		}
	}
	tap() {
		this.hooks.arch.tap("node", function (name1, name2) {
			console.log('node', name1, name2)
			return 1
		})
		this.hooks.arch.tap("react", function (name1, name2) {
			console.log('react', name1, name2)
		})
	}
	start() {
		this.hooks.arch.call("与 x 对应，传入 tap 插件的第一个参数", "传了也没啥用")
	}
}


let l = new Lesson();

l.tap()

l.start()

// function anonymous(x) {
//     "use strict";
//     var _context;
//     var _x = this._x;
//     var _fn0 = _x[0];
//     var _result0 = _fn0(x);
//     if(_result0 !== undefined) {
//          return _result0;
//     } else {
//          var _fn1 = _x[1];
//          var _result1 = _fn1(x);
//          if(_result1 !== undefined) {
//              return _result1;
//          } else {
// 
//          }
//     } 
// }
//     node 与 x 对应，传入 tap 插件的第一个参数 undefined
