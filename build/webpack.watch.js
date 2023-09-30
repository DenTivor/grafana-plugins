const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const miniCssExtractPluginDark = require('mini-css-extract-plugin');
const miniCssExtractPluginLight = require('mini-css-extract-plugin');
const packageJson = require('../package.json');

const baseWebpackConfig = require('./webpack.base');
const {watchModules} = require('./settings');
const {targetPlatformFolder} = require('./settings');

const config = watchModules.map((name) => {
  const settings = baseWebpackConfig(name);
  settings.mode = 'development'
  settings.watch = true;

  settings.output = {
    path: `${targetPlatformFolder}/${name}`,
    filename: 'module.js',
    libraryTarget: 'amd'
  };

  settings.plugins = [
    // exclude files for delete in target folder
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '!*.svg',
        '!plugin.json',
        '!README.md'
      ],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      global: 'window'
    }),
    new webpack.ProgressPlugin(),
    new ReplaceInFileWebpackPlugin([{
      dir: `${targetPlatformFolder}/${name}`,
      test: /plugin\.json/,
      rules: [{
        search: '%VERSION%',
        replace: packageJson.version
      },
      {
        search: '%TODAY%',
        replace: moment().format('YYYY.MM.DD')
      }
      ]
    }]),
    new miniCssExtractPluginDark({filename: './css/panelDarkStyle.css'}),
    new miniCssExtractPluginLight({filename: './css/panelLightStyle.css'})
  ];

  return settings;
})

module.exports = config;