let SyncBailHook = require('../lib/SyncBailHook.js')
let sh = new SyncBailHook(['a', 'b'])

sh.tap({name: '1'}, () => {console.log(1)})
// sh.tap({name: 'async', type: 'async'}, () => {console.log(2)})
sh.tap({name: '2'}, () => {console.log(2); return '结束'})
sh.tap({name: '3'}, () => {console.log(3)})

sh.intercept({
    register(tap){
        return tap
    },
    tap(tap){
        // 处理tap
    },
    call(...args){
        // 获取sh.call传入的参数
    }
})

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
    var _tap0 = _taps[0];
    _interceptors[0].tap(_tap0);
    var _fn0 = _x[0];
    var _result0 = _fn0(a, b);
    if (_result0 !== undefined) {
        return _result0;;
    } else {
        var _tap1 = _taps[1];
        _interceptors[0].tap(_tap1);
        var _fn1 = _x[1];
        var _result1 = _fn1(a, b);
        if (_result1 !== undefined) {
            return _result1;;
        } else {
            var _tap2 = _taps[2];
            _interceptors[0].tap(_tap2);
            var _fn2 = _x[2];
            var _result2 = _fn2(a, b);
            if (_result2 !== undefined) {
                return _result2;;
            } else {}
        }
    }

}
1
2

function anonymous(a, b, _callback) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);
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
            _callback(null, _result0);;
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
                    _callback(null, _result1);;
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
                            _callback(null, _result2);;
                        } else {
                            _callback();
                        }
                    }
                }
            }
        }
    }

}
1
2
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
                _resolve(_result0);;
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
                        _resolve(_result1);;
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
                                _resolve(_result2);;
                            } else {
                                _resolve();
                            }
                        }
                    }
                }
            }
        }
        _sync = false;
    });

}
1
2
结束