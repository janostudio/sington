// Karma configuration
// Generated on Fri Jan 26 2018 09:17:53 GMT+0800 (CST)
var webpackConfig = require('./build/webpack.test.conf')

module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/*.js'
    ],
    exclude: [],
    preprocessors: {
      'test/*.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage-istanbul-reporter'
    ],
    reporters: ['coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'cobertura', 'text-summary'],
      dir: 'coverage/',
      // 如果使用webpack和预加载器，可以绕过webpack打破源路径
      fixWebpackSourcePaths: true,
      // 停止输出消息，如`File [$ {filename}]忽略，没有任何东西可以映射
      skipFilesWithNoCoverage: true,
      'report-config': {
        html: {
          subdir: 'html'
        }
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  };
  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }
  config.set(configuration);
}