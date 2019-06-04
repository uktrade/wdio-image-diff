# wdio-image-diff

This wrapper was created to make visual regression as simple as possible, by exposing basic functions that allow you to view the difference between images.
The wrapper uses [pixelmatch](https://github.com/mapbox/pixelmatch) which is simple and powerful and relies on a browser object of [webdriverIO](https://github.com/webdriverio) to take screenshots.

**This is very much a POC, features to make this wrapper more usable and flexible will be added in the issues tab.

## Build status

[![CircleCI](https://circleci.com/gh/uktrade/wdio-image-diff/tree/master.svg?style=svg)](https://circleci.com/gh/uktrade/wdio-image-diff/tree/master)

## Capabilities
- Compares 2 images
- Saves baseline if no baseline is present
- Creates a diff image in case of failure
- Works with any device/browser supported by webdriverIO
- It's currently limited to take screenshots of the entire page

## Integration with webdriverIO
- in `wdio.conf.js` require the package: `const WdioImage = require ('@uktrade/wdio-image-diff-js').default`
- instantiate and expose the `wdioImageDiff` instance to the browser object:
  ```
  before: function () {
    const wdioImageDiff = new WdioImage(browser)
    browser.imageDiff = wdioImageDiff
  },
  ```

## Writing a test
- Writing a visual test is composed by 3 steps:
  1) navigating to a URL and if needed interacting with the UI to navigate to a specific page
  2) take a screenshot
  3) validate it with the baseline (if no baseline is present for the given test, it will save it for you)
- Ensure the `TestName` provided in `take` and `validate` functions match and are unique between tests.
  ```
  const assert = require('assert')

  describe('Visual Test', () => {
    it('should visually check google home page is correct', async () => {
      await browser.url('https://google.com')
      await browser.imageDiff.take('UniqueTestName')
      await browser.imageDiff.validate('UniqueTestName').then(result => {
        assert.equal(result, 0)
      })
    })
  })
  ```
