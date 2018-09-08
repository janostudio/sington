const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig  = require('./webpack.base.conf');

baseConfig.entry = './src/sington.js';
baseConfig.output.filename = 'sington.min.js';
baseConfig.plugins = [];

baseConfig.plugins.push[
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
  })
]

module.exports = {
  ...baseConfig,
  //压缩js
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false
        }
      })
    ]
  },
}
