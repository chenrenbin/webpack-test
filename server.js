const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config.js');
config.entry.unshift('webpack-hot-middleware/client.js') // 使webpack-hot-middleware生效
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: true
}));

// Tell express to use the webpack-hot-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  heartbeat: 10 * 1000
}));

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('app listening on http://localhost:3000\n');
});