const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { getStyle } = require('./webpack.util')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [].concat(getStyle(true))
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../examples/index.html'),
      chunks: ['debugger']
    })
  ],
  devServer: {
    compress: true,
    port: 8080
  }
})
