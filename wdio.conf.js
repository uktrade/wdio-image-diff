/* eslint-disable */
require('dotenv').config()

const WdioImage = require('./lib').default
const browserstack = require('browserstack-local')

const browserStackUser = process.env.BROWSERSTACK_USERNAME || ''
const browserStackKey = process.env.BROWSERSTACK_ACCESS_KEY || ''
let testName

const remoteConfig = {
  services: ['browserstack', 'static-server'],
  user: browserStackUser,
  key: browserStackKey,
  browserstackLocal: true,
  // Code to start browserstack local before start of test
  onPrepare: function () {
    console.log("Connecting local");
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.key }, function(error) {
        if (error) return reject(error);
        console.log('Connected. Now testing...');
        resolve();
      });
    });
  },
  // Code to stop browserstack local after end of test
  onComplete: function () {
    exports.bs_local.stop(function() {});
  },
  capabilities: [
    {
      'os': 'Windows',
      'os_version': '10',
      'browser': 'Chrome',
      'browser_version': '76.0 beta',
      'resolution': '1920x1080'
    },
    {
      'os': 'Windows',
      'os_version': '10',
      'browser': 'IE',
      'browser_version': '11.0',
      'resolution': '1920x1080'
    },
  ]
}

const defaultConfig = {
  specs: [
    './e2e/specs/**/*.js',
  ],
  maxInstances: 10,
  capabilities: [{ browser: 'Chrome' }],
  logLevel: 'error',
  bail: 0,
  baseUrl: 'http://localhost:4455',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    timeout: 60000,
  },
  staticServerFolders: [
    { mount: '/report', path: './report-example.html' },
  ],
  staticServerPort: 4455,
  before: () => {
    const wdioImageDiff = new WdioImage(browser, { threshold: 0.3 })
    browser.imageDiff = wdioImageDiff
  },
  beforeTest: (test) => {
    testName = `${test.fullTitle} - ${browser.capabilities.browserName}`
    browser.imageDiff.testName = testName
  },
  after: () => {
    browser.imageDiff.generateReport()
  }
}

exports.config = Object.assign({}, defaultConfig, remoteConfig)
