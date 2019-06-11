import path from './config/config'
import createDir from './utils'
import imageDiff from './commands/image-diff'
import saveScreenshot from './commands/save-screenshot'

class WdioImage {
  constructor(browser, options = undefined) {
    const options = options || {}
    const width = options.width || 1280
    const height = options.height || 870
    this._threshold = options.threshold || 0.0
    // webdriverIO browser instance
    this._browser = browser

    // Create parent directory
    createDir(path.parentDir)

    // Sets window size
    this._browser.windowHandleSize({ width, height })

    // Create subfolders in parent directory
    Object.values(path.dir).forEach(dir => {
      createDir(dir)
    })
  }

  take(testName) {
    return saveScreenshot(this._browser, testName)
  }

  validate(testName) {
    return imageDiff(testName, this._threshold)
  }
}

export default WdioImage
