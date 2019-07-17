import createDir from './utils'
import { createReport } from './reporter'
import imageDiff from './commands/image-diff'
import path from './config/config'
import saveScreenshot from './commands/save-screenshot'
import TestStatus from './reporter/test-status'

class WdioImage {
  constructor(browser, opts = undefined) {
    const options = opts || {}

    // Properties
    this.testName = 'Undefined test name'
    this.testStatuses = []
    this._threshold = options.threshold || 0.0

    // wdio browser instance
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

  async validate() {
    const result = await imageDiff(this.testName, this._threshold)
    this.testStatuses.push(new TestStatus(result, this.testName))
    return result
  }

  generateReport() {
    createReport({ tests: this.testStatuses })
  }
}

export default WdioImage
