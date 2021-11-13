const PluginA = require('./plugin1');
module.exports = {
  mode: 'production',
  entry: './index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // comment out to see output working
          'thread-loader',
          require.resolve('./loader2.js'),
          require.resolve('./loader.js'),
        ]
      }
    ]
  },
  plugins: [
    new PluginA()
  ]
}
