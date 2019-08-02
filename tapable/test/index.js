let SyncHook = require('../lib/SyncHook.js')

let h1 = new SyncHook(['options']);

h1.intercept({
  call: (...args) => {
    console.log(...args, '-------------intercept call');
  },
  //
  register: (tap) => {
  console.log(tap, '------------------intercept register');

    return tap;
  },
  loop: (...args) => {
    console.log(...args, '-------------intercept loop')
  },
  tap: (tap) => {
    console.log(tap, '-------------------intercept tap')

  }
})


h1.tap('A', function (arg) {
  console.log('A',arg);
  return 'b'; // 除非你在拦截器上的 register 上调用这个函数,不然这个返回值你拿不到.
})

h1.tap({
  name: 'B',
  before: 'A'
  }, () => {
    console.log('i am B')
  }
)
h1.tap('C', function () {
  console.log('c')
})
h1.tap('D', function () {
  console.log('d')
})


h1.call(6);

// function anonymous(options
//   ) {
//   "use strict";
//   var _context;
//   var _x = this._x;
//   var _taps = this.taps;
//   var _interceptors = this.interceptors;
//   _interceptors[0].call(options);
//   var _tap0 = _taps[0];
//   _interceptors[0].tap(_tap0);
//   var _fn0 = _x[0];
//   _fn0(options);
//   var _tap1 = _taps[1];
//   _interceptors[0].tap(_tap1);
//   var _fn1 = _x[1];
//   _fn1(options);
//   var _tap2 = _taps[2];
//   _interceptors[0].tap(_tap2);
//   var _fn2 = _x[2];
//   _fn2(options);
//   var _tap3 = _taps[3];
//   _interceptors[0].tap(_tap3);
//   var _fn3 = _x[3];
//   _fn3(options);
//   }