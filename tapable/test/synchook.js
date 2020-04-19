let SyncHook = require('../lib/SyncHook.js')
let sh = new SyncHook(['a', 'b'], 'test')
console.log(sh)
sh.tap(
    {
        name: "1"
    }, 
    () => {console.log(1)}
)
// sh.tap(
//     {
//         name: "3",
//         type: 'async'
//     }, 
//     // (a,b, fn) => {console.log(1);fn(new Error('异步代码出错了'))}
//     (a,b, fn) => {console.log(1);fn(false)}
// )
sh.tap(
    {
        name: "2"
    }, 
    () => {console.log(1)}
)

sh.tap(
    {
        name: "3"
    }, 
    () => {console.log(1)}
)
sh.intercept(
    {
        // 在调用tap/tapAsync/tapPromise新注册插件的时候会用所有拦截器的register处理这个新的插件
        // 在调用intercept添加拦截器的时候，会用该拦截器的register处理已经添加的插件
        register: (tap) => {
            tap.stage = 20
            return tap
        },
        // 用于构建header,接收sh.call传入的参数
        call: (...args) => {
            console.log('intercept1',args)
        },
        // 接收插件
        tap: (tap) => {
            
        }
    }
)

sh.intercept(
    {
        // 在调用tap/tapAsync/tapPromise新注册插件的时候会用所有拦截器的register处理这个新的插件
        // 在调用intercept添加拦截器的时候，会用该拦截器的register处理已经添加的插件
        register: (tap) => {
            tap.stage = 20
            return tap
        },
        // 用于构建header,接收sh.call传入的参数
        call: (...args) => {
            console.log('intercept2',args)
        },
        // 接收插件
        tap: (tap) => {
            
        }
    }
)
sh.call(1,2)
sh.callAsync(1,2,() => {console.log('cb')}) // 这里的最后一个参数是回调函数，如果插件函数发生错误，那么会将错误信息作为回调的第一个参数
sh.promise(1,2).then((err) => {console.log(err)}, (err) => {console.log(err)})


function anonymous(a, b) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);
    _interceptors[1].call(a, b);

    function _next1() {
        var _tap2 = _taps[2];
        _interceptors[0].tap(_tap2);
        _interceptors[1].tap(_tap2);
        var _fn2 = _x[2];
        var _hasError2 = false;
        try {
            _fn2(a, b);
        } catch(_err) {
            _hasError2 = true;
            throw _err;
        }
        if(!_hasError2) {
            var _tap3 = _taps[3];
            _interceptors[0].tap(_tap3);
            _interceptors[1].tap(_tap3);
            var _fn3 = _x[3];
            var _hasError3 = false;
            try {
                _fn3(a, b);
            } catch(_err) {
                _hasError3 = true;
                throw _err;
            }
            if(!_hasError3) {}
        }
    }


    var _tap0 = _taps[0];
    _interceptors[0].tap(_tap0);
    _interceptors[1].tap(_tap0);
    var _fn0 = _x[0];
    _fn0(a, b);


    var _tap1 = _taps[1];
    _interceptors[0].tap(_tap1);
    _interceptors[1].tap(_tap1);
    var _fn1 = _x[1];
    _fn1(a, b, _err1 => {
        if(_err1) {
            throw _err1;
        } else {
            _next1();
        }
    });
}

function anonymous(a, b) {
    "use strict";
    return new Promise((_resolve, _reject) => {
        var _sync = true;
        function _error(_err) {
            if(_sync)
                _resolve(Promise.resolve().then(() => { throw _err; }));
            else
                _reject(_err);
        };
        var _context;
        var _x = this._x;
        var _taps = this.taps;
        var _interceptors = this.interceptors;
        _interceptors[0].call(a, b);
        _interceptors[1].call(a, b);

        var _tap0 = _taps[0];
        _interceptors[0].tap(_tap0);
        _interceptors[1].tap(_tap0);
        var _fn0 = _x[0];
        var _hasError0 = false;
        try {
            _fn0(a, b);
        } catch(_err) {
            _hasError0 = true;
            _error(_err);
        }
        if(!_hasError0) {
            var _tap1 = _taps[1];
            _interceptors[0].tap(_tap1);
            _interceptors[1].tap(_tap1);
            var _fn1 = _x[1];
            var _hasError1 = false;
            try {
                _fn1(a, b);
            } catch(_err) {
                _hasError1 = true;
                _error(_err);
            }
            if(!_hasError1) {
                var _tap2 = _taps[2];
                _interceptors[0].tap(_tap2);
                _interceptors[1].tap(_tap2);
                var _fn2 = _x[2];
                var _hasError2 = false;
                try {
                    _fn2(a, b);
                } catch(_err) {
                    _hasError2 = true;
                    _error(_err);
                }
                if(!_hasError2) {
                    _resolve();
                }
            }
        }
        _sync = false;
    });
}