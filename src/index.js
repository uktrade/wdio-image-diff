import path from './config/config'
import createDir from './utils'
import imageDiff from './commands/image-diff'
import saveScreenshot from './commands/save-screenshot'

class WdioImage {
  testName = 'Undefined test name'

  constructor(browser, opts = undefined) {
    const options = opts || {}
    const width = options.width || 1280
    const height = options.height || 870
    this._threshold = options.threshold || 0.0
    // webdriverIO browser instance
    this._browser = browser

    // Create parent directory
    createDir(path.parentDir)

    // Sets window size
    this._browser.setWindowSize(width, height)

    // Create subfolders in parent directory
    Object.values(path.dir).forEach(dir => {
      createDir(dir)
    })
  }

  take() {
    return saveScreenshot(this._browser, testName)
  }

  validate() {
    return imageDiff(testName, this._threshold)
  }
}

export default WdioImage
