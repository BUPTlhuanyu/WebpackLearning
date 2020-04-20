/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-04-20 09:28:26
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-20 11:44:04
 */
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
swh.callAsync(1,2,() => {console.log('cb')}) // 这里的最后一个参数是回调函数，如果插件函数发生错误，那么会将错误信息作为回调的第一个参数
swh.promise(1,2).then((err) => {console.log(err)}, (err) => {console.log(err)})

function anonymous(a, b) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);
    var _loop;
    do {
        _loop = false;
        _interceptors[0].loop(a, b);
        var _tap0 = _taps[0];
        _interceptors[0].tap(_tap0);
        var _fn0 = _x[0];
        var _result0 = _fn0(a, b);
        if (_result0 !== undefined) {
            _loop = true;
        } else {
            var _tap1 = _taps[1];
            _interceptors[0].tap(_tap1);
            var _fn1 = _x[1];
            var _result1 = _fn1(a, b);
            if (_result1 !== undefined) {
                _loop = true;
            } else {
                var _tap2 = _taps[2];
                _interceptors[0].tap(_tap2);
                var _fn2 = _x[2];
                var _result2 = _fn2(a, b);
                if (_result2 !== undefined) {
                    _loop = true;
                } else {
                    if (!_loop) {}
                }
            }
        }
    } while (_loop);

}
[0, 2]
[0, 2]
[0, 2]

function anonymous(a, b, _callback) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);
    var _loop;
    do {
        _loop = false;
        _interceptors[0].loop(a, b);
        var _tap0 = _taps[0];
        _interceptors[0].tap(_tap0);
        var _fn0 = _x[0];
        var _hasError0 = false;
        try {
            var _result0 = _fn0(a, b);
        } catch (_err) {
            _hasError0 = true;
            _callback(_err);
        }
        if (!_hasError0) {
            if (_result0 !== undefined) {
                _loop = true;
            } else {
                var _tap1 = _taps[1];
                _interceptors[0].tap(_tap1);
                var _fn1 = _x[1];
                var _hasError1 = false;
                try {
                    var _result1 = _fn1(a, b);
                } catch (_err) {
                    _hasError1 = true;
                    _callback(_err);
                }
                if (!_hasError1) {
                    if (_result1 !== undefined) {
                        _loop = true;
                    } else {
                        var _tap2 = _taps[2];
                        _interceptors[0].tap(_tap2);
                        var _fn2 = _x[2];
                        var _hasError2 = false;
                        try {
                            var _result2 = _fn2(a, b);
                        } catch (_err) {
                            _hasError2 = true;
                            _callback(_err);
                        }
                        if (!_hasError2) {
                            if (_result2 !== undefined) {
                                _loop = true;
                            } else {
                                if (!_loop) {
                                    _callback();
                                }
                            }
                        }
                    }
                }
            }
        }
    } while (_loop);

}
[1, 2]
[1, 2]
[1, 2]
cb

function anonymous(a, b) {
    "use strict";
    return new Promise((_resolve, _reject) => {
        var _sync = true;

        function _error(_err) {
            if (_sync)
                _resolve(Promise.resolve().then(() => {
                    throw _err;
                }));
            else
                _reject(_err);
        };
        var _context;
        var _x = this._x;
        var _taps = this.taps;
        var _interceptors = this.interceptors;
        _interceptors[0].call(a, b);
        var _loop;
        do {
            _loop = false;
            _interceptors[0].loop(a, b);
            var _tap0 = _taps[0];
            _interceptors[0].tap(_tap0);
            var _fn0 = _x[0];
            var _hasError0 = false;
            try {
                var _result0 = _fn0(a, b);
            } catch (_err) {
                _hasError0 = true;
                _error(_err);
            }
            if (!_hasError0) {
                if (_result0 !== undefined) {
                    _loop = true;
                } else {
                    var _tap1 = _taps[1];
                    _interceptors[0].tap(_tap1);
                    var _fn1 = _x[1];
                    var _hasError1 = false;
                    try {
                        var _result1 = _fn1(a, b);
                    } catch (_err) {
                        _hasError1 = true;
                        _error(_err);
                    }
                    if (!_hasError1) {
                        if (_result1 !== undefined) {
                            _loop = true;
                        } else {
                            var _tap2 = _taps[2];
                            _interceptors[0].tap(_tap2);
                            var _fn2 = _x[2];
                            var _hasError2 = false;
                            try {
                                var _result2 = _fn2(a, b);
                            } catch (_err) {
                                _hasError2 = true;
                                _error(_err);
                            }
                            if (!_hasError2) {
                                if (_result2 !== undefined) {
                                    _loop = true;
                                } else {
                                    if (!_loop) {
                                        _resolve();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } while (_loop);
        _sync = false;
    });

}
[1, 2]
[1, 2]
[1, 2]
undefined