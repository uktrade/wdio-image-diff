import path from '../config/config'

const saveElementScreenshot = (browser, testName, elementCssPath) => {
  const element = browser.element(elementCssPath)
  return element.saveScreenshot(path.image.comparison(testName))
}

export default saveElementScreenshot
