module.exports = function (api) {
  api.cache(true);

  const presets = [
    ["@babel/env", {
      targets: {
        android: '4',
        ios: '8'
      },
      useBuiltIns: "usage",
      corejs: "3"
    }]
  ];
  const plugins = [];

  return {
    presets,
    plugins
  };
}