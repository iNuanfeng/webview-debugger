// const isSourceMap = process.env.NODE_ENV === 'development'
const path = require('path')
const fs = require('fs')

const getStyle = isDev => {
  const specPath = [/node_modules/]
  const rule = [
    {
      test: /^((?!nomodules).)*\.(le|c)ss((?!nomodules).)*$/,
      exclude: specPath,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        // {
        //   loader: 'px2rem-loader',
        //   options: {
        //     remUnit: (200 / 640) * 750
        //   }
        // },
        {
          loader: 'less-loader'
        }
      ]
    },
    {
      test: /\.(le|c)ss/,
      include: specPath,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        // {
        //   loader: 'px2rem-loader',
        //   options: {
        //     remUnit: (100 / 640) * 750
        //   }
        // },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            sourceMap: isDev
          }
        }
      ]
    },
    {
      test: /nomodules\.less/,
      exclude: specPath,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        // {
        //   loader: 'px2rem-loader',
        //   options: {
        //     remUnit: (200 / 640) * 750
        //   }
        // },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            sourceMap: isDev
          }
        }
      ]
    }
  ]

  return rule
}

module.exports = {
  getStyle
}
