const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ["./src/index.js"], 
  output: {
    path: path.resolve(__dirname, "../dist"), 
    filename: "sington.js",
    library: ['sington'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      // {
      //   test: /\.(js)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../test")]
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    })
  ]
}
