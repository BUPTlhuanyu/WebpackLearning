let Hook = require('../lib/Hook.js')

let hook = new Hook('args', 'name')
console.log(hook)
console.log(hook.isUsed())

hook.tap({name: 'sync1', type: 'async', stage: 20}, ()=>{console.log('sync1')})
hook.tapAsync({name: 'async1', stage: 10}, ()=>{console.log('async1')})
hook.tapPromise({name: 'promise1', before:'async1', stage: 15}, ()=>{console.log('promise1')})
console.log(hook)

hook.intercept({
    register: (taps) => {
        taps.stage = 20
        return taps
    }
})
console.log(hook)
console.log(hook.isUsed())

hook.tapAsync({name: 'async1', stage: 10}, ()=>{console.log('async1')})
console.log(hook)

hook.call()
hook.callAsync()
hook.promise()