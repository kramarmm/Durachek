var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var express = require('express')
var app = new (require('express'))()
var port = 3000
var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

app.get("/result", function(req, res) {
  setTimeout(() => res.send( Math.floor(Math.random()*6 + 1) + "" ), 1000)
  // res.send( Math.floor(Math.random()*6 + 1) + "" )
})

app.use(express.static(__dirname + '/public'))

app.listen(port, function(error) {
if (error) {
    console.error(error)
} else {
    console.info("==> Listening on port 3000")
}
})
