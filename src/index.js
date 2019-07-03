import path from './config/config'
import createDir from './utils'
import imageDiff from './commands/image-diff'
import saveScreenshot from './commands/save-screenshot'

class WdioImage {
  constructor(browser, opts = undefined) {
    const options = opts || {}

    // Properties
    this.testName = 'Undefined test name'
    this._threshold = options.threshold || 0.0

    // webdriverIO browser instance
    this._browser = browser

    // Create parent directory
    createDir(path.parentDir)

    // Sets window size
    this._browser.setWindowSize(options.width || 1280, options.height || 870)

    // Create subfolders in parent directory
    Object.values(path.dir).forEach(dir => {
      createDir(dir)
    })
  }

  take() {
    return saveScreenshot(this._browser, this.testName)
  }

  validate() {
    return imageDiff(this.testName, this._threshold)
  }
}

export default WdioImage
