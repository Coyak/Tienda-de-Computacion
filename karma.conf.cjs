module.exports = function(config) {
  config.set({
    // Base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // Frameworks to use
    frameworks: ['jasmine'],

    // List of files / patterns to load in the browser
    files: [
      'src/test-setup.js',
      'src/**/*.test.js',
      'src/**/*.test.jsx'
    ],

    // List of files to exclude
    exclude: [
    ],

    // Preprocess matching files before serving them to the browser
    preprocessors: {
      'src/**/*.test.js': ['webpack', 'sourcemap'],
      'src/**/*.test.jsx': ['webpack', 'sourcemap']
    },

    // Webpack configuration
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { node: 'current' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    // Test results reporter to use
    reporters: ['progress', 'coverage-istanbul'],

    // Coverage configuration
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcov'],
      dir: 'coverage',
      fixWebpackSourcePaths: true,
      'report-config': {
        html: { outDir: 'html' }
      }
    },

    // Web server port
    port: 9876,

    // Enable / disable colors in the output (reporters and logs)
    colors: true,

    // Level of logging
    logLevel: config.LOG_INFO,

    // Enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    singleRun: false,

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
