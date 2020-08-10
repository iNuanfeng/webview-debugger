module.exports = function (api) {
  api.cache(true)

  const presets = [
    ['@babel/env', {
      modules: false,
      // useBuiltIns: 'usage',
      // corejs: 3,
      targets: {
        android: '4',
        ios: '8'
      }
    }]
  ]

  const plugins = [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
    // ['@babel/plugin-proposal-decorators', { 'legacy': true }]
    // '@babel/plugin-proposal-class-properties',
    // '@babel/plugin-syntax-dynamic-import',
    // '@babel/plugin-proposal-export-default-from',
    // '@babel/plugin-proposal-export-namespace-from'
  ]

  return {
    presets,
    plugins,
    sourceType: 'unambiguous',
    comments: false,
    compact: false
  }
}
