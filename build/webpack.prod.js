const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { getStyle } = require('./webpack.util')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [].concat(getStyle(false))
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
})
