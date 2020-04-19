let SyncBailHook = require('../lib/SyncBailHook.js')
let sh = new SyncBailHook(['a', 'b'])

sh.tap({name: '1'}, () => {console.log(1)})
sh.tap({name: 'async', type: 'async'}, () => {console.log(2)})
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
                return _result2;
            } else {
                var _tap3 = _taps[3];
                _interceptors[0].tap(_tap3);
                var _fn3 = _x[3];
                var _hasError3 = false;
                try {
                    var _result3 = _fn3(a, b);
                } catch(_err) {
                    _hasError3 = true;
                    throw _err;
                }
                if(!_hasError3) {
                    if(_result3 !== undefined) {
                        return _result3;
                    } else {}
                }
            }
        }
    }

    var _tap0 = _taps[0];
    _interceptors[0].tap(_tap0);
    var _fn0 = _x[0];
    var _result0 = _fn0(a, b);
    if(_result0 !== undefined) {
        return _result0;
    } else {
        var _tap1 = _taps[1];
        _interceptors[0].tap(_tap1);
        var _fn1 = _x[1];
        _fn1(a, b, 
            (_err1, _result1) => {
                if(_err1) {
                    throw _err1;
                } else {
                    if(_result1 !== undefined) {
                        return _result1;
                    } else {
                        return _next1();
                    }
                }
            }
        );
    }
}