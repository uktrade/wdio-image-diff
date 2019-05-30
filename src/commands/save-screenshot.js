import path from '../config/config'

const saveScreenshot = (browser, testName) => {
  browser.saveScreenshot(path.comparisonImgPath(testName));
}

export default saveScreenshot
