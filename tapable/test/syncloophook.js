let SyncLoopHook = require('../lib/SyncLoopHook.js')
let swh = new SyncLoopHook(['a', 'b'])

swh.tap({name:'1'}, (...args) => {console.log(args); return })
// swh.tap({name:'2', type: 'async'}, (...args) => {console.log(args); args[2](false, undefined)})
swh.tap({name:'2'}, (...args) => {console.log(args); return })
swh.tap({name:'3'}, (...args) => {console.log(args); return })

swh.intercept({
    call(...args){
        // 获取args
    },
    tap(tap){
        // 处理tap
    },
    loop(...args){
        // 获取到args
    }
})

swh.call(0, 2)

function anonymous(a, b
    ) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);

    var _loop;
    do {
        _loop = false;
        var _tap0 = _taps[0];
        _interceptors[0].tap(_tap0);
        var _fn0 = _x[0];
        var _result0 = _fn0(a, b);

        if(_result0 !== undefined) {
            _loop = true;
        } else {
            var _tap1 = _taps[1];
            _interceptors[0].tap(_tap1);
            var _fn1 = _x[1];
            var _result1 = _fn1(a, b);

            if(_result1 !== undefined) {
                _loop = true;
            } else {
                var _tap2 = _taps[2];
                _interceptors[0].tap(_tap2);
                var _fn2 = _x[2];
                var _result2 = _fn2(a, b);
                if(_result2 !== undefined) {
                    _loop = true;
                } else {
                    if(!_loop) {}
                }
            }
        }
    } while(_loop);
}

function anonymous(a, b) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);
    var _looper = () => {
        var _loopAsync = false;
        var _loop;
        do {
            _loop = false;
            function _next1() {
                var _tap2 = _taps[2];
                _interceptors[0].tap(_tap2);
                var _fn2 = _x[2];
                var _hasError2 = false;
                try {
                    var _result2 = _fn2(a, b);
                } catch(_err) {
                    _hasError2 = true;
                    throw _err;
                }
                if(!_hasError2) {
                    if(_result2 !== undefined) {
                        _loop = true;
                        if(_loopAsync) _looper();
                        } else {
                            if(!_loop) {}
                        }
                }   
            }
            var _tap0 = _taps[0];
            _interceptors[0].tap(_tap0);
            var _fn0 = _x[0];
            var _hasError0 = false;
            try {
                var _result0 = _fn0(a, b);
            } catch(_err) {
                _hasError0 = true;
                throw _err;
            }
            if(!_hasError0) {
                if(_result0 !== undefined) {
                    _loop = true;
                    if(_loopAsync) _looper();
                    } else {
                        var _tap1 = _taps[1];
                        _interceptors[0].tap(_tap1);
                        var _fn1 = _x[1];
                        _fn1(a, b, (_err1, _result1) => {
                            if(_err1) {
                                throw _err1;
                            } else {
                                if(_result1 !== undefined) {
                                    _loop = true;
                                    if(_loopAsync) _looper();
                                } else {
                                    _next1();
                                }
                            }
                        });
                    }
            }
        } while(_loop);
        _loopAsync = true;
    };
    _looper();
    
}
    