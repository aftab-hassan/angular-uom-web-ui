// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('karma-phantomjs-launcher'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('phantomjs-prebuilt'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    mime: {
      'text/x-typescript': ['ts']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage'
      }
    },
    junitReporter: {
       useBrowserName: false,
       outputDir: 'coverage',
       outputFile: 'test-results.xml'
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters:  ['progress', 'karma-remap-istanbul', 'coverage', 'junit'],    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'], //Chrome
    singleRun: true
  });
};
