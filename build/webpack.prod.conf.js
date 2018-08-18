const webpack = require('webpack');
const path = require('path');
const baseConfig  = require('./webpack.base.conf');

baseConfig.plugins.push[
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  })
]

module.exports = {
  ...baseConfig
}
