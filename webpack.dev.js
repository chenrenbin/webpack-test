const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // 报错定位
  devServer: { // 使用webpack-dev-server自动刷新，或使用webpack-dev-middleware+express
    contentBase: './dist',
    hot: true //  热更新
  },
  plugins: [
    // 启动HMR---热更新
    new webpack.HotModuleReplacementPlugin()
  ]
});