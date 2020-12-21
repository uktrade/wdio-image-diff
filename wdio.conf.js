/* eslint-disable */
require('dotenv').config()

const WdioImage = require('./lib').default

const browserStackUser = process.env.BROWSERSTACK_USERNAME || ''
const browserStackKey = process.env.BROWSERSTACK_ACCESS_KEY || ''
let testName

const remoteConfig = {
  services: [
    [
      'browserstack', {
        browserstackLocal: true
      }
    ],
    'static-server'
  ],
  user: browserStackUser,
  key: browserStackKey,
  browserstackLocal: true,
  capabilities: [
    {
      'os': 'Windows',
      'os_version': '10',
      'browserName': 'Chrome',
      'resolution': '1024x768'
    },
    {
      'os': 'Windows',
      'os_version': '10',
      'browserName': 'IE',
      'browser_version': '11.0',
      'resolution': '1024x768'
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
  featureFlags: {
    specFiltering: true
  },
  before: function (capabilities, specs, browser) {
    const wdioImageDiff = new WdioImage(browser, { threshold: 0.3 })
    browser.imageDiff = wdioImageDiff
  },
  beforeTest: function (test) {
    testName = `${test.parent} ${test.title} - ${browser.capabilities.browserName}`
    browser.imageDiff.testName = testName
  },
  after: function () {
    browser.imageDiff.generateReport()
  },
}

exports.config = Object.assign({}, defaultConfig, remoteConfig)
