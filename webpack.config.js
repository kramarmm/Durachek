var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: "source-map",

  entry: [
    'webpack-hot-middleware/client?http://localhost:3000',
    './src/index.js'
  ],

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [{
      loaders: ['react-hot-loader', 'babel-loader'],
      test: /\.js?$/,
      include: path.join(__dirname, '/src'),
      exclude: /(node_modules)/
    }]
  }
}