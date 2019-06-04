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
    return saveScreenshot(this._browser, testName)
  }

  validate(testName) {
    return imageDiff(testName)
  }
}

export default WdioImage
