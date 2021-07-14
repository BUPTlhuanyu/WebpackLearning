> 注意，在使用 ts，并且使用 ts-loader 的时候，module 应该设置为 esnext，这样ts才不会把 import 专程 require，因为 webpack 只能识别 import 来做动态splitChunk打包



`import('../xxx').then(...);`

上面代码会被编译成

`webpack_require.e(0).then(webpack_require.bind(null, '../xxx')).then(...)`


执行调用webpack_require.e --> 该方法创建一个 jsonp 获取webpack处理后的动态模块代码 --> 将动态代码存储起来，并reslove --> resolve 会触发执行webpack强行插入的then() --> 该代码中会执行会取出存储的动态代码，然后 resolve 这个模块 --> 最后执行 async 真正的 then