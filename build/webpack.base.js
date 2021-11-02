const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    debugger: path.resolve(__dirname, '../src/index.js'),
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@lib': path.resolve(__dirname, '../src/lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {}
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loaders: [
          {
            loader: 'vue-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=10240'
      }
    ]
  },
  plugins: [new VueLoaderPlugin(), new CleanWebpackPlugin()]
}
