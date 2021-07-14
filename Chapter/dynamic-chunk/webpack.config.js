
// webpack.config.js
module.exports = {
    entry: {
      app: __dirname + '/main.js'
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: __dirname + '/dist',
      chunkFilename: '[name].bundle.[chunkhash:8].js',
      publicPath: '/'
    }
  }  