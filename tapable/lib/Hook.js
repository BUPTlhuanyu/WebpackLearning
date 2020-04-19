/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const util = require("util");

// 调用node的模块util.deprecate封装() => {}并返回deprecateContext函数
// 在deprecateContext函数执行的时候会执行() => {}，并打印出"Hook.context is deprecated and will be removed"
const deprecateContext = util.deprecate(() => {},
	"Hook.context is deprecated and will be removed");

const CALL_DELEGATE = function (...args) {
	// 生成代码
	this.call = this._createCall("sync");
	console.log(this.call.toString())
	// 执行代码
	return this.call(...args);
};
const CALL_ASYNC_DELEGATE = function (...args) {
	this.callAsync = this._createCall("async");
	console.log(this.callAsync.toString())
	return this.callAsync(...args);
};
const PROMISE_DELEGATE = function (...args) {
	this.promise = this._createCall("promise");
	console.log(this.promise.toString())
	return this.promise(...args);
};

class Hook {
	constructor(args = [], name = undefined) {
		this._args = args;
		this.name = name;
		this.taps = [];
		this.interceptors = [];
		this._call = CALL_DELEGATE;
		this.call = CALL_DELEGATE;
		this._callAsync = CALL_ASYNC_DELEGATE;
		this.callAsync = CALL_ASYNC_DELEGATE;
		this._promise = PROMISE_DELEGATE;
		this.promise = PROMISE_DELEGATE;
		this._x = undefined;

		// 将原型链上的方法复制到实例上
		this.compile = this.compile;
		this.tap = this.tap;
		this.tapAsync = this.tapAsync;
		this.tapPromise = this.tapPromise;
	}

	compile(options) {
		throw new Error("Abstract: should be overridden");
	}

	_createCall(type) {
		return this.compile({
			taps: this.taps,
			interceptors: this.interceptors,
			args: this._args,
			type: type
		});
	}


	/**
	 * 注册动作的钩子
	 * @param {*} type 
	 * @param {*} options 是字符串的时候，表示这个动作的名字；如果是对象，before与after表示该动作的前后动作
	 * @param {*} fn 动作对应的函数
	 */
	_tap(type, options, fn) {
		if (typeof options === "string") {
			options = {
				name: options
			};
		} else if (typeof options !== "object" || options === null) {
			throw new Error("Invalid tap options");
		}
		if (typeof options.name !== "string" || options.name === "") {
			throw new Error("Missing name for tap");
		}
		// 忽略
		if (typeof options.context !== "undefined") {
			// options.context被废弃
			deprecateContext();
		}
		options = Object.assign({
			type,
			fn
		}, options);
		// 利用拦截器的Register改造传入的插件对象options，如果Register(options)返回值为undefined则原来的对象不会被改造
		options = this._runRegisterInterceptors(options);
		// 将options插入taps数组中
		this._insert(options);
	}

	// 同步tab
	tap(options, fn) {
		this._tap("sync", options, fn);
	}

	// 异步tab
	tapAsync(options, fn) {
		this._tap("async", options, fn);
	}

	// promise的tab
	tapPromise(options, fn) {
		this._tap("promise", options, fn);
	}

	/**
	 * 用interceptors的每个interceptor.register处理options
	 * @param {*} options 
	 */
	_runRegisterInterceptors(options) {
		for (const interceptor of this.interceptors) {
			if (interceptor.register) {
				const newOptions = interceptor.register(options);
				if (newOptions !== undefined) {
					options = newOptions;
				}
			}
		}
		return options;
	}

	withOptions(options) {
		const mergeOptions = opt =>
			Object.assign({}, options, typeof opt === "string" ? {
				name: opt
			} : opt);

		return {
			name: this.name,
			tap: (opt, fn) => this.tap(mergeOptions(opt), fn),
			tapAsync: (opt, fn) => this.tapAsync(mergeOptions(opt), fn),
			tapPromise: (opt, fn) => this.tapPromise(mergeOptions(opt), fn),
			intercept: interceptor => this.intercept(interceptor),
			isUsed: () => this.isUsed(),
			withOptions: opt => this.withOptions(mergeOptions(opt))
		};
	}

	isUsed() {
		return this.taps.length > 0 || this.interceptors.length > 0;
	}

	// 注册拦截器，拦截器用于调用call，tab等函数时调用的函数
	// taps中的每一项都是_tap传入的经过拦截器处理的option
	// 1、将拦截器存储在this.interceptors上
	// 2、拦截器如果有register属性，利用该拦截器对每一个taps中的元素进行处理，并将返回结果替换原来的taps对应位置上的item，这个拦截器是实例在调用tab的时候触发的
	intercept(interceptor) {
		this._resetCompilation();
		this.interceptors.push(Object.assign({}, interceptor));
		if (interceptor.register) {
			for (let i = 0; i < this.taps.length; i++) {
				this.taps[i] = interceptor.register(this.taps[i]);
			}
		}
	}

	// 重置实例方法为内部提供的默认方法
	_resetCompilation() {
		this.call = this._call;
		this.callAsync = this._callAsync;
		this.promise = this._promise;
	}
	/**
	 * @param item是一个包含插件名字，插件函数的对象
	 * 该函数功能就是将传入的插件按照stage以及before进行排序，插入到插件队列
	 * 比如
	 * item为{name:'f',stage: 1,before:['a', 'b']},
	 * this.taps为[{name:'a',stage: 1,before:['a', 'b']}, {name:'b',stage: 3,before:['a', 'b']},{name:'c',stage: 4,before:['a', 'b']}]
	 * 那么item会放到a后面，如果item.stage是0，则放到a之前，如果item.stage为100，则放到a后面
	 * taps中会并不是按照stage排序的，而是按照item的before排序，然后再根据stage排序
	 * item如果没有stage，则默认是0，如果taps中的item没有stage，则默认为0，最终item会插入到数组没有stage或者stage为0的后面
	 * stage大的放到数组后面，
	 */
	_insert(item) {
		this._resetCompilation();
		let before;
		if (typeof item.before === "string") {
			before = new Set([item.before]);
		} else if (Array.isArray(item.before)) {
			// 去重
			before = new Set(item.before);
		}
		let stage = 0;
		if (typeof item.stage === "number") {
			stage = item.stage;
		}
		let i = this.taps.length;
		while (i > 0) {
			i--;
			const x = this.taps[i];
			this.taps[i + 1] = x;
			const xStage = x.stage || 0;
			if (before) {
				if (before.has(x.name)) {
					before.delete(x.name);
					continue;
				}
				if (before.size > 0) {
					continue;
				}
			}
			if (xStage > stage) {
				continue;
			}
			i++;
			break;
		}
		this.taps[i] = item;
	}
}

Object.setPrototypeOf(Hook.prototype, null);

module.exports = Hook;
