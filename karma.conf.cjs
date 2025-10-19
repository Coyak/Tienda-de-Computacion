module.exports = function(config) {
  config.set({
    // Base path that will be used to resolve all patterns
    basePath: '',

    // Frameworks to use
    frameworks: ['jasmine'],

    // List of files / patterns to load in the browser
    files: [
      // Tests puros de Jasmine
      'src/tests-jasmine-puro/TestRenderizado.test.js',
      'src/tests-jasmine-puro/TestProps.test.js',
      'src/tests-jasmine-puro/TestEstado.test.js',
      'src/tests-jasmine-puro/TestEventos.test.js'
    ],

    // List of files to exclude
    exclude: [],

    // Preprocess matching files before serving them to the browser
    preprocessors: {
      'src/tests-jasmine-puro/**/*.test.js': ['webpack', 'sourcemap']
    },

    // Webpack configuration
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { node: 'current' } }]
                ]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js']
      }
    },

    // Test results reporter to use
    reporters: ['progress', 'coverage-istanbul'],

    // Coverage configuration
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcov'],
      dir: 'coverage',
      fixWebpackSourcePaths: true
    },

    // Web server port
    port: 9876,

    // Enable / disable colors in the output
    colors: true,

    // Level of logging
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    singleRun: true,

    // Concurrency level
    concurrency: Infinity,

    // Custom launchers
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--no-sandbox',
          '--disable-web-security',
          '--disable-gpu',
          '--remote-debugging-port=9222',
          '--disable-dev-shm-usage'
        ]
      }
    }
  })
}
