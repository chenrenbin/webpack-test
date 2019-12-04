const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/index.ts',
    vendor: ['lodash']
  },
  output: {
    filename: '[name].[hash].js',
    // chunkFilename: '[name].bundle.js', // 动态import的模块名
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/' // 用于webpack-dev-middleware+express
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理
    new HtmlWebpackPlugin({ // 自动绑定所有bundle
      filename: 'index.html', // 输出到dist的文件名，默认index.html
      template: 'index.html'  // 输出文件的模板，绝对/相对路径
    }),
    new webpack.HashedModuleIdsPlugin() // 固定vendor的hash值不被刷新
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