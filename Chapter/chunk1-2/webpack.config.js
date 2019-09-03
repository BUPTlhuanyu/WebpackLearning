
// webpack.config.js
module.exports = {
    entry: {
      app: __dirname + '/a.js'
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: __dirname + '/dist',
      chunkFilename: '[name].bundle.[chunkhash:8].js',
      publicPath: '/'
    },
    optimization: {
      runtimeChunk: {
        name: 'bundle'
      }
    },
  }  