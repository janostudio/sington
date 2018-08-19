const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const baseConfig = require('./webpack.base.conf');
const opn = require('opn');

baseConfig.entry.push('webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:9001/');
baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
baseConfig.mode = 'development';

const devConfig = {
  contentBase: path.join(__dirname, '../'),
  publicPath: '/',
  watchOptions: {
    ignored: /node_modules/,
  },
  historyApiFallback: {
    disableDotRule: true,
  },
  inline: true,
  hot: true,
  quiet: true,
}

const compiler = webpack(baseConfig);
const devServer = new WebpackDevServer(compiler, devConfig);

const port = parseInt(process.env.PORT, 10) || 9001;
const HOST = process.env.HOST || '0.0.0.0';
devServer.listen(port, HOST, err => {
  if (err) {
    return console.log(err);
  }
  opn('http://localhost:' + port);
});