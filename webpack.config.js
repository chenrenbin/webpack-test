const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  // webpack-dev-middleware启用HMR
  // entry: ['webpack-hot-middleware/client.js', './src/index.js'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/' // 用于webpack-dev-middleware+express
  },
  devtool: 'inline-source-map', // 报错定位
  devServer: { // 使用webpack-dev-server自动刷新，或使用webpack-dev-middleware+express
    contentBase: './dist',
    hot: true //  热更新
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理
    new HtmlWebpackPlugin({// 自动绑定所有bundle
      filename: 'index.html', // 输出到dist的文件名，默认index.html
      template: 'index.html'  // 输出文件的模板，绝对/相对路径
    }),
    // 启动HMR---热更新
    new webpack.HotModuleReplacementPlugin()
  ],
};