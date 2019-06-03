import assert from 'assert'
import path from './config/config'
import createDir from './utils'
import imageDiff from './commands/image-diff'
import saveScreenshot from './commands/save-screenshot'

class WdioImage {
  constructor(browser) {
    // webdriverIO browser instance
    this._browser = browser

    // Create parent directory
    createDir(path.parentDir)

    // Create subfolders in parent directory
    Object.values(path.dir).forEach(dir => {
      createDir(dir)
    })
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
