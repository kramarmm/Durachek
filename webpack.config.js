var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client?http://localhost:3000',
    './src/js/index.js',
  ],

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /(node_modules)/,
        include: [
          path.join(__dirname, '/src/styles'),
        ],
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, '/src/js'),
        use: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]' },
          },
        ],
      },
    ],
  },
};
