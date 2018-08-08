const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },

  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      exclude: /(node_modules)/,
    })
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
