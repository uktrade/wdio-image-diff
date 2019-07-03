# wdio-image-diff

This wrapper was created to make visual regression as simple as possible, by exposing basic functions that allow you to view the difference between images.
The wrapper uses [pixelmatch](https://github.com/mapbox/pixelmatch) which is simple and powerful and relies on a browser object of [webdriverIO](https://github.com/webdriverio) to take screenshots.

## Build status

[![CircleCI](https://circleci.com/gh/uktrade/wdio-image-diff/tree/master.svg?style=svg)](https://circleci.com/gh/uktrade/wdio-image-diff/tree/master)

## Capabilities
- Compares 2 images
- Saves baseline if no baseline is present
- Creates a diff image in case of failure
- Works with any device/browser supported by wdio and your third party i.e saucelabs
- Force browser window size so it's not reliant on third party (size can be modified via options)

**It's currently limited to take screenshots of the entire page

## Integration with webdriverIO
- in `wdio.conf.js` require the package: `const WdioImage = require ('@uktrade/wdio-image-diff-js').default`
- instantiate and expose the `wdioImageDiff` instance to the browser object:
  ```
  exports.config = {
    before: () => {
      const wdioImageDiff = new WdioImage(browser)
      browser.imageDiff = wdioImageDiff
    },
    beforeTest: (test) => {
      browser.imageDiff.testName = `${test.fullTitle} - ${browser.capabilities.browserName}`
    },
  }
  ```

## Writing a test
- Writing a visual test is composed by 3 steps:
  1) navigating to a URL and if needed interacting with the UI to navigate to a specific page
  2) take a screenshot
  3) validate it with the baseline (if no baseline is present for the given test, it will save it for you)
  ```
  const assert = require('assert')

  describe('Visual Test', () => {
    it('should visually check data hub home page is correct', async () => {
      await browser.url('')
      await browser.imageDiff.take()
      await browser.imageDiff.validate().then(result => {
        assert.equal(result, 0)
      })
    })
  })
  ```

## Options

When instantiating the `WdioImage` you can provide an `options` object i.e:

```
const options = {
  width: 1024,
  height: 768,
  threshold: 0.1
}
const wdioImageDiff = new WdioImage(browser, options)
```

the default values if options or any of its keys is not provided are:
  - width: 1280
  - height: 870
  - threshold: 0.0

## Properties

Available properties used by methods of the class

`testName # Default value set to 'Undefined test name'`
