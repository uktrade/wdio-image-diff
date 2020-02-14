# Integration with WDIO

The integration with WDIO consists on dependency injection to avoid complexity
and promote flexibility on creation of driver / test framework adaptors in the future

## WDIO config file

in `wdio.conf.js` require the package: `const WdioImage = require ('@uktrade/wdio-image-diff-js').default`

instantiate and expose the `wdioImageDiff` instance to the browser object:
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

### Options

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

### Properties

Available properties used by methods of the class

`testName` # Default value set to 'Undefined test name'

## Writing a test

  ```
  const assert = require('assert')

  describe('Visual Test', () => {
    it('should visually check data hub home page is correct', async () => {
      await browser.url('')
      await browser.imageDiff.take() // alternatively you can use takeElement(elementCssPath)
      await browser.imageDiff.validate().then(result => {
        assert.equal(result, 0) // 0 represents the pixel differences between images
      })
    })
  })
  ```
