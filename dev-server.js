const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

const express = require('express');
const app = express();

const port = 3000;
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));

app.listen(port, function(error) {
  if (error) {
      console.error(error);
  } else {
      console.info(' ==> Listening on port 3000');
  }
})
