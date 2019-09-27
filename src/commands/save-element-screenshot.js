import path from '../config/config'

const saveElementScreenshot = async (browser, testName, elementCssPath) => {
  const element = await browser.$(elementCssPath)
  return element.saveScreenshot(path.image.comparison(testName))
}

export default saveElementScreenshot
