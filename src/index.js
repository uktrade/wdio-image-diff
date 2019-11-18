import { createDir, cleanDir } from './utils'
import { createReport } from './reporter'
import imageDiff from './commands/image-diff'
import path from './config'
import saveScreenshot from './commands/save-screenshot'
import saveElementScreenshot from './commands/save-element-screenshot'
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
    this.browserName = this._browser.capabilities.browserName || ''
  
    // Create parent directory
    createDir(path.parentDir)

    // Sets window size
    this._browser.setWindowSize(options.width || 1280, options.height || 870)

    // Create subfolders in parent directory
    Object.values(path.dir).forEach(dir => {
      createDir(dir)
    })

    // Clean diff and comparison subfolders
    cleanDir(path.dir.comparison)
    cleanDir(path.dir.diff)
  }

  take() {
    return saveScreenshot(this._browser, this.testName)
  }

  takeElement(elementCssPath) {
    return saveElementScreenshot(this._browser, this.testName, elementCssPath)
  }

  async validate() {
    const result = await imageDiff(this.testName, this._threshold)
    this.testStatuses.push(new TestStatus(result, this.testName))
    return result
  }

  generateReport() {
    createDir(path.reportDir)
    createReport({ tests: this.testStatuses, browserName: this.browserName })
  }
}

export default WdioImage
