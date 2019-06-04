# Wdio-image-diff

This package is visual regression tool intended to expose functions to allow you to view the difference between 2 images.
The wrapper uses pixelmatch and relies on a browser instance of webdriverio to take screenshots.

**This is very much a POC still, features to make this wrapper more usable and flexible will be added in the issues tab.

## Build status

[![CircleCI](https://circleci.com/gh/uktrade/wdio-image-diff/tree/master.svg?style=svg)](https://circleci.com/gh/uktrade/wdio-image-diff/tree/master)

## Integration with webdriverIO

- in `wdio.conf.js` require the package: `const WdioImage = require ('@uktrade/wdio-image-diff-js').default`
- instantiate and expose the wdioimagediff instance to the browser object:
  ```
  before: function () {
    const wdioImageDiff = new WdioImage(browser)
    browser.imageDiff = wdioImageDiff
  },
  ```

## Writing a test

- Writing a visual test is composed by 3 steps
  1) navigating to a URL and if needed interacting with the UI to navigate to a specific page
  2) take a screenshot
  3) validate it with the baseline (if no baseline is present for the given test, it will save it for you)
  ```
  const assert = require('assert')

  describe('Visual Test', () => {
    it('should visually check google home page is correct', async () => {
      await browser.url('https://google.com')
      await browser.imageDiff.take('SomeTest4')
      await browser.imageDiff.validate('SomeTest4').then(result => {
        assert.equal(result, 0)
      })
    })
  })
  ```
- Ensure whatever test name provided while taking/validating the images is unique, otherwise it will override itself.
