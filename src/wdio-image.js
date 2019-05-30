import assert from 'assert'
import imageDiff from './commands/image-diff'
import saveScreenshot from './commands/save-screenshot'

class WdioImage {
  constructor(browser) {
    this._browser = browser;
  }

  take(testName) {
    saveScreenshot(this._browser, testName)
  }

  validate(testName) {
    const result = imageDiff(testName)
    return assert(result == 0)
  }
}

export default WdioImage
