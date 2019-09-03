module.exports = {
    mode: 'development',
    entry:{
        boundle: __dirname + '/main.js'
    },
    output:{
        filename: 'boundle.js',
        path: __dirname + '/dist'
    },
    resolveLoader: {
      // 假设本地编写的loader在loaders文件夹下
      modules: ['node_modules', './Chapter/loader/loaders']
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'remove-comment-loader', // 当匹配到js文件时，使用我们编写的remove-comment-loader
            options: {
                test: 'test'
            }
          }
        ]
      }
  }