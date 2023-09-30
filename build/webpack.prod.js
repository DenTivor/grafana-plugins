const baseWebpackConfig = require('./webpack.base');
const {prodModules} = require('./settings');

const config = prodModules.map((name) => {
  const settings = baseWebpackConfig(name);
  settings.mode = 'production'

  return settings
})

module.exports = config;