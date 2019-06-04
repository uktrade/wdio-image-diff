import path from '../config/config'

const saveScreenshot = (browser, testName) => {
  browser.saveScreenshot(path.image.comparison(testName))
}

export default saveScreenshot
