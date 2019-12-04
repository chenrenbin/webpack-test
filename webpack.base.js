const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: '[name].bundle.js',
    // chunkFilename: '[name].bundle.js', // 动态import的模块名
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/' // 用于webpack-dev-middleware+express
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理
    new HtmlWebpackPlugin({// 自动绑定所有bundle
      filename: 'index.html', // 输出到dist的文件名，默认index.html
      template: 'index.html'  // 输出文件的模板，绝对/相对路径
    })
  ],
  optimization: { // 代码分离
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  }
};