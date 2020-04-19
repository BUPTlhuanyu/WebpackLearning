let AsyncParallelBailHook = require('../lib/AsyncParallelBailHook.js')
let aph = new AsyncParallelBailHook(['a', 'b'])

aph.tapAsync({ name: '1' }, () => { console.log(1) })
aph.tapAsync({ name: '2' }, () => { console.log(2); return '结束' })
aph.tapAsync({ name: '3' }, () => { console.log(3) })

aph.intercept({
    register(tap) {
        return tap
    },
    tap(tap) {
        // 处理tap
    },
    call(...args) {
        // 获取sh.call传入的参数
    }
})

aph.callAsync(1, 2, () => { console.log('cb') }) // 这里的最后一个参数是回调函数，如果插件函数发生错误，那么会将错误信息作为回调的第一个参数
aph.promise(1, 2).then((err) => { console.log(err) }, (err) => { console.log(err) })

function anonymous(a, b, _callback
) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);
    var _results = new Array(3);
    var _checkDone = () => {
        for (var i = 0; i < _results.length; i++) {
            var item = _results[i];
            if (item === undefined) return false;
            if (item.result !== undefined) {
                _callback(null, item.result);
                return true;
            }
            if (item.error) {
                _callback(item.error);
                return true;
            }
        }
        return false;
    }
    do {
        var _counter = 3;
        var _done = () => {
            _callback();
        };
        if (_counter <= 0) break;
        var _tap0 = _taps[0];
        _interceptors[0].tap(_tap0);
        var _fn0 = _x[0];
        _fn0(a, b, (_err0, _result0) => {
            if (_err0) {
                if (_counter > 0) {
                    if (0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err0 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            } else {
                if (_counter > 0) {
                    if (0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }
        });
        if (_counter <= 0) break;
        if (1 >= _results.length) {
            if (--_counter === 0) _done();
        } else {
            var _tap1 = _taps[1];
            _interceptors[0].tap(_tap1);
            var _fn1 = _x[1];
            _fn1(a, b, (_err1, _result1) => {
                if (_err1) {
                    if (_counter > 0) {
                        if (1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err1 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                } else {
                    if (_counter > 0) {
                        if (1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }
            });
        }
        if (_counter <= 0) break;
        if (2 >= _results.length) {
            if (--_counter === 0) _done();
        } else {
            var _tap2 = _taps[2];
            _interceptors[0].tap(_tap2);
            var _fn2 = _x[2];
            _fn2(a, b, (_err2, _result2) => {
                if (_err2) {
                    if (_counter > 0) {
                        if (2 < _results.length && ((_results.length = 3), (_results[2] = { error: _err2 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                } else {
                    if (_counter > 0) {
                        if (2 < _results.length && (_result2 !== undefined && (_results.length = 3), (_results[2] = { result: _result2 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }
            });
        }
    } while (false);

}
1
2
3
function anonymous(a, b
) {
    "use strict";
    return new Promise((_resolve, _reject) => {
        var _sync = true;
        function _error(_err) {
            if (_sync)
                _resolve(Promise.resolve().then(() => { throw _err; }));
            else
                _reject(_err);
        };
        var _context;
        var _x = this._x;
        var _taps = this.taps;
        var _interceptors = this.interceptors;
        _interceptors[0].call(a, b);
        var _results = new Array(3);
        var _checkDone = () => {
            for (var i = 0; i < _results.length; i++) {
                var item = _results[i];
                if (item === undefined) return false;
                if (item.result !== undefined) {
                    _resolve(item.result);
                    return true;
                }
                if (item.error) {
                    _error(item.error);
                    return true;
                }
            }
            return false;
        }
        do {
            var _counter = 3;
            var _done = () => {
                _resolve();
            };
            if (_counter <= 0) break;
            var _tap0 = _taps[0];
            _interceptors[0].tap(_tap0);
            var _fn0 = _x[0];
            _fn0(a, b, (_err0, _result0) => {
                if (_err0) {
                    if (_counter > 0) {
                        if (0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err0 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                } else {
                    if (_counter > 0) {
                        if (0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }
            });
            if (_counter <= 0) break;
            if (1 >= _results.length) {
                if (--_counter === 0) _done();
            } else {
                var _tap1 = _taps[1];
                _interceptors[0].tap(_tap1);
                var _fn1 = _x[1];
                _fn1(a, b, (_err1, _result1) => {
                    if (_err1) {
                        if (_counter > 0) {
                            if (1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err1 }), _checkDone())) {
                                _counter = 0;
                            } else {
                                if (--_counter === 0) _done();
                            }
                        }
                    } else {
                        if (_counter > 0) {
                            if (1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                                _counter = 0;
                            } else {
                                if (--_counter === 0) _done();
                            }
                        }
                    }
                });
            }
            if (_counter <= 0) break;
            if (2 >= _results.length) {
                if (--_counter === 0) _done();
            } else {
                var _tap2 = _taps[2];
                _interceptors[0].tap(_tap2);
                var _fn2 = _x[2];
                _fn2(a, b, (_err2, _result2) => {
                    if (_err2) {
                        if (_counter > 0) {
                            if (2 < _results.length && ((_results.length = 3), (_results[2] = { error: _err2 }), _checkDone())) {
                                _counter = 0;
                            } else {
                                if (--_counter === 0) _done();
                            }
                        }
                    } else {
                        if (_counter > 0) {
                            if (2 < _results.length && (_result2 !== undefined && (_results.length = 3), (_results[2] = { result: _result2 }), _checkDone())) {
                                _counter = 0;
                            } else {
                                if (--_counter === 0) _done();
                            }
                        }
                    }
                });
            }
        } while (false);
        _sync = false;
    });

}
1
2
3
function anonymous(a, b, _callback
) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);
    var _results = new Array(3);
    var _checkDone = () => {
        for (var i = 0; i < _results.length; i++) {
            var item = _results[i];
            if (item === undefined) return false;
            if (item.result !== undefined) {
                _callback(null, item.result);
                return true;
            }
            if (item.error) {
                _callback(item.error);
                return true;
            }
        }
        return false;
    }
    do {
        var _counter = 3;
        var _done = () => {
            _callback();
        };
        if (_counter <= 0) break;
        var _tap0 = _taps[0];
        _interceptors[0].tap(_tap0);
        var _fn0 = _x[0];
        var _hasError0 = false;
        try {
            var _result0 = _fn0(a, b);
        } catch (_err) {
            _hasError0 = true;
            if (_counter > 0) {
                if (0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err }), _checkDone())) {
                    _counter = 0;
                } else {
                    if (--_counter === 0) _done();
                }
            }
        }
        if (!_hasError0) {
            if (_counter > 0) {
                if (0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                    _counter = 0;
                } else {
                    if (--_counter === 0) _done();
                }
            }
        }
        if (_counter <= 0) break;
        if (1 >= _results.length) {
            if (--_counter === 0) _done();
        } else {
            var _tap1 = _taps[1];
            _interceptors[0].tap(_tap1);
            var _fn1 = _x[1];
            var _hasError1 = false;
            try {
                var _result1 = _fn1(a, b);
            } catch (_err) {
                _hasError1 = true;
                if (_counter > 0) {
                    if (1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }
            if (!_hasError1) {
                if (_counter > 0) {
                    if (1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }
        }
        if (_counter <= 0) break;
        if (2 >= _results.length) {
            if (--_counter === 0) _done();
        } else {
            var _tap2 = _taps[2];
            _interceptors[0].tap(_tap2);
            var _fn2 = _x[2];
            var _hasError2 = false;
            try {
                var _result2 = _fn2(a, b);
            } catch (_err) {
                _hasError2 = true;
                if (_counter > 0) {
                    if (2 < _results.length && ((_results.length = 3), (_results[2] = { error: _err }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }
            if (!_hasError2) {
                if (_counter > 0) {
                    if (2 < _results.length && (_result2 !== undefined && (_results.length = 3), (_results[2] = { result: _result2 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }
        }
    } while (false);

}
1
2
cb
function anonymous(a, b
) {
    "use strict";
    return new Promise((_resolve, _reject) => {
        var _sync = true;
        function _error(_err) {
            if (_sync)
                _resolve(Promise.resolve().then(() => { throw _err; }));
            else
                _reject(_err);
        };
        var _context;
        var _x = this._x;
        var _taps = this.taps;
        var _interceptors = this.interceptors;
        _interceptors[0].call(a, b);
        var _results = new Array(3);
        var _checkDone = () => {
            for (var i = 0; i < _results.length; i++) {
                var item = _results[i];
                if (item === undefined) return false;
                if (item.result !== undefined) {
                    _resolve(item.result);
                    return true;
                }
                if (item.error) {
                    _error(item.error);
                    return true;
                }
            }
            return false;
        }
        do {
            var _counter = 3;
            var _done = () => {
                _resolve();
            };
            if (_counter <= 0) break;
            var _tap0 = _taps[0];
            _interceptors[0].tap(_tap0);
            var _fn0 = _x[0];
            var _hasError0 = false;
            try {
                var _result0 = _fn0(a, b);
            } catch (_err) {
                _hasError0 = true;
                if (_counter > 0) {
                    if (0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }
            if (!_hasError0) {
                if (_counter > 0) {
                    if (0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }
            if (_counter <= 0) break;
            if (1 >= _results.length) {
                if (--_counter === 0) _done();
            } else {
                var _tap1 = _taps[1];
                _interceptors[0].tap(_tap1);
                var _fn1 = _x[1];
                var _hasError1 = false;
                try {
                    var _result1 = _fn1(a, b);
                } catch (_err) {
                    _hasError1 = true;
                    if (_counter > 0) {
                        if (1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }
                if (!_hasError1) {
                    if (_counter > 0) {
                        if (1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }
            }
            if (_counter <= 0) break;
            if (2 >= _results.length) {
                if (--_counter === 0) _done();
            } else {
                var _tap2 = _taps[2];
                _interceptors[0].tap(_tap2);
                var _fn2 = _x[2];
                var _hasError2 = false;
                try {
                    var _result2 = _fn2(a, b);
                } catch (_err) {
                    _hasError2 = true;
                    if (_counter > 0) {
                        if (2 < _results.length && ((_results.length = 3), (_results[2] = { error: _err }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }
                if (!_hasError2) {
                    if (_counter > 0) {
                        if (2 < _results.length && (_result2 !== undefined && (_results.length = 3), (_results[2] = { result: _result2 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }
            }
        } while (false);
        _sync = false;
    });

}
1
2
function anonymous(a, b, _callback
) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(a, b);
    var _results = new Array(3);
    var _checkDone = () => {
        for (var i = 0; i < _results.length; i++) {
            var item = _results[i];
            if (item === undefined) return false;
            if (item.result !== undefined) {
                _callback(null, item.result);
                return true;
            }
            if (item.error) {
                _callback(item.error);
                return true;
            }
        }
        return false;
    }
    do {
        var _counter = 3;
        var _done = () => {
            _callback();
        };
        if (_counter <= 0) break;
        var _tap0 = _taps[0];
        _interceptors[0].tap(_tap0);
        var _fn0 = _x[0];
        var _hasResult0 = false;
        var _promise0 = _fn0(a, b);
        if (!_promise0 || !_promise0.then)
            throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
        _promise0.then(_result0 => {
            _hasResult0 = true;
            if (_counter > 0) {
                if (0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                    _counter = 0;
                } else {
                    if (--_counter === 0) _done();
                }
            }
        }, _err0 => {
            if (_hasResult0) throw _err0;
            if (_counter > 0) {
                if (0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err0 }), _checkDone())) {
                    _counter = 0;
                } else {
                    if (--_counter === 0) _done();
                }
            }
        });
        if (_counter <= 0) break;
        if (1 >= _results.length) {
            if (--_counter === 0) _done();
        } else {
            var _tap1 = _taps[1];
            _interceptors[0].tap(_tap1);
            var _fn1 = _x[1];
            var _hasResult1 = false;
            var _promise1 = _fn1(a, b);
            if (!_promise1 || !_promise1.then)
                throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
            _promise1.then(_result1 => {
                _hasResult1 = true;
                if (_counter > 0) {
                    if (1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }, _err1 => {
                if (_hasResult1) throw _err1;
                if (_counter > 0) {
                    if (1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err1 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            });
        }
        if (_counter <= 0) break;
        if (2 >= _results.length) {
            if (--_counter === 0) _done();
        } else {
            var _tap2 = _taps[2];
            _interceptors[0].tap(_tap2);
            var _fn2 = _x[2];
            var _hasResult2 = false;
            var _promise2 = _fn2(a, b);
            if (!_promise2 || !_promise2.then)
                throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise2 + ')');
            _promise2.then(_result2 => {
                _hasResult2 = true;
                if (_counter > 0) {
                    if (2 < _results.length && (_result2 !== undefined && (_results.length = 3), (_results[2] = { result: _result2 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }, _err2 => {
                if (_hasResult2) throw _err2;
                if (_counter > 0) {
                    if (2 < _results.length && ((_results.length = 3), (_results[2] = { error: _err2 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            });
        }
    } while (false);

}
function anonymous(a, b
) {
    "use strict";
    return new Promise((_resolve, _reject) => {
        var _sync = true;
        function _error(_err) {
            if (_sync)
                _resolve(Promise.resolve().then(() => { throw _err; }));
            else
                _reject(_err);
        };
        var _context;
        var _x = this._x;
        var _taps = this.taps;
        var _interceptors = this.interceptors;
        _interceptors[0].call(a, b);
        var _results = new Array(3);
        var _checkDone = () => {
            for (var i = 0; i < _results.length; i++) {
                var item = _results[i];
                if (item === undefined) return false;
                if (item.result !== undefined) {
                    _resolve(item.result);
                    return true;
                }
                if (item.error) {
                    _error(item.error);
                    return true;
                }
            }
            return false;
        }
        do {
            var _counter = 3;
            var _done = () => {
                _resolve();
            };
            if (_counter <= 0) break;
            var _tap0 = _taps[0];
            _interceptors[0].tap(_tap0);
            var _fn0 = _x[0];
            var _hasResult0 = false;
            var _promise0 = _fn0(a, b);
            if (!_promise0 || !_promise0.then)
                throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
            _promise0.then(_result0 => {
                _hasResult0 = true;
                if (_counter > 0) {
                    if (0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            }, _err0 => {
                if (_hasResult0) throw _err0;
                if (_counter > 0) {
                    if (0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err0 }), _checkDone())) {
                        _counter = 0;
                    } else {
                        if (--_counter === 0) _done();
                    }
                }
            });
            if (_counter <= 0) break;
            if (1 >= _results.length) {
                if (--_counter === 0) _done();
            } else {
                var _tap1 = _taps[1];
                _interceptors[0].tap(_tap1);
                var _fn1 = _x[1];
                var _hasResult1 = false;
                var _promise1 = _fn1(a, b);
                if (!_promise1 || !_promise1.then)
                    throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
                _promise1.then(_result1 => {
                    _hasResult1 = true;
                    if (_counter > 0) {
                        if (1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }, _err1 => {
                    if (_hasResult1) throw _err1;
                    if (_counter > 0) {
                        if (1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err1 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                });
            }
            if (_counter <= 0) break;
            if (2 >= _results.length) {
                if (--_counter === 0) _done();
            } else {
                var _tap2 = _taps[2];
                _interceptors[0].tap(_tap2);
                var _fn2 = _x[2];
                var _hasResult2 = false;
                var _promise2 = _fn2(a, b);
                if (!_promise2 || !_promise2.then)
                    throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise2 + ')');
                _promise2.then(_result2 => {
                    _hasResult2 = true;
                    if (_counter > 0) {
                        if (2 < _results.length && (_result2 !== undefined && (_results.length = 3), (_results[2] = { result: _result2 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                }, _err2 => {
                    if (_hasResult2) throw _err2;
                    if (_counter > 0) {
                        if (2 < _results.length && ((_results.length = 3), (_results[2] = { error: _err2 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if (--_counter === 0) _done();
                        }
                    }
                });
            }
        } while (false);
        _sync = false;
    });

}
结束
cb
1


let aph1 = new AsyncParallelBailHook(['a', 'b'])
aph1.tap({ name: '1' }, () => { console.log(1) })
aph1.tap({ name: '2' }, () => { console.log(2); return '结束' })
aph1.tap({ name: '3' }, () => { console.log(3) })

aph1.intercept({
    register(tap) {
        return tap
    },
    tap(tap) {
        // 处理tap
    },
    call(...args) {
        // 获取sh.call传入的参数
    }
})
aph1.callAsync(1, 2, () => { console.log('cb') })
aph1.promise(1, 2).then((err) => { console.log(err) }, (err) => { console.log(err) })


let aph2 = new AsyncParallelBailHook(['a', 'b'])
aph2.tapPromise({ name: '1' }, () => { return new Promise((r, j) => { r(1) }) })
aph2.tapPromise({ name: '2' }, () => { return new Promise((r, j) => { r(2) }) })
aph2.tapPromise({ name: '3' }, () => { return new Promise((r, j) => { r(3) }) })

aph2.intercept({
    register(tap) {
        return tap
    },
    tap(tap) {
        // 处理tap
    },
    call(...args) {
        // 获取sh.call传入的参数
    }
})
aph2.callAsync(1, 2, () => { console.log('cb') })
aph2.promise(1, 2).then((err) => { console.log(err) }, (err) => { console.log(err) })
