const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const miniCssExtractPluginDark = require('mini-css-extract-plugin');
const miniCssExtractPluginLight = require('mini-css-extract-plugin');
const packageJson = require('../package.json');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function resolveDist(dir) {
  return path.join(__dirname, '../dist', dir);
}

module.exports = (moduleName) => {
  return {
    target: 'node',
    context: resolve(`packages/${moduleName}/src`),
    entry: {
      [moduleName]: './index.ts'
    },
    output: {
      path: resolveDist(moduleName),
      filename: 'module.js',
      libraryTarget: 'amd'
    },
    optimization: {
      mangleExports: 'deterministic',
      innerGraph: true,
      mangleWasmImports: true,
      mergeDuplicateChunks: true,
      removeAvailableModules: true,
      nodeEnv: 'production'
    },
    externals: [
      // remove the line below if you don't want to use buildin versions
      'jquery',
      'lodash',
      'moment',
      'react',
      'react-dom',
      '@grafana/ui',
      '@grafana/data',
      '@grafana/runtime',
      function (context, request, callback) {
        var prefix = 'grafana/';
        if (request.indexOf(prefix) === 0) {
          return callback(null, request.substr(prefix.length));
        }
        callback();
      }
    ],
    plugins: [
      new CleanWebpackPlugin({
        dangerouslyAllowCleanPatternsOutsideProject: true,
        dry: false
      }),
      new webpack.DefinePlugin({
        global: 'window'
      }),
      new webpack.ProgressPlugin(),
      new CopyWebpackPlugin([{from: 'assets'}]),
      new ReplaceInFileWebpackPlugin([{
        dir: resolveDist(moduleName),
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
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        'src': resolve('src')
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        // graphql fix
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: process.env.NODE_ENV !== 'production'
              }
            },
            'less-loader'
          ]
        },
        {
          test: /\.panelDarkStyle\.(s?)css$/,
          use: [
            miniCssExtractPluginDark.loader,
            'css-loader',
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.panelLightStyle\.(s?)css$/,
          use: [
            miniCssExtractPluginLight.loader,
            'css-loader',
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}