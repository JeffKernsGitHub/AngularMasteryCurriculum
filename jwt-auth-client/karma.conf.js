// Karma configuration file, see link for more information
// https://karma-runner.github.io/6.4/config/configuration-file.html
const { execSync } = require('child_process');

function getAvailableBrowser() {
  if (process.env.CHROME_BIN) return 'ChromeHeadless';
  try {
    execSync('which google-chrome || which chromium || which chromium-browser', { stdio: 'ignore' });
    return 'ChromeHeadless';
  } catch {
    try {
      execSync('which firefox', { stdio: 'ignore' });
      return 'FirefoxHeadless';
    } catch {
      return 'ChromeHeadless';
    }
  }
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
    ],
    client: {
      jasmine: {
        // configuration options for Jasmine
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/jwt-auth-client'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: [getAvailableBrowser()],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    },
    restartOnFileChange: true,
    singleRun: false
  });
};
