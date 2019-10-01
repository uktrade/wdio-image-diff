import path from '../config/config'
import { crop } from 'easyimage'

const saveElementScreenshot = async (browser, testName, elementCssPath) => {
  const imgPath = path.image.comparison(testName)

  const element = await browser.$(elementCssPath)
  const elementSize = await element.getSize()
  const elementLocation = await element.getLocation()

  await browser.saveScreenshot(imgPath)

  return cropImage(elementSize.width, elementSize.height, elementLocation.x, elementLocation.y, imgPath)
}

const cropImage = async (elemenetWidth, elementHeight, elementX, elementY, imgPath) => {
  await crop(
    {
      src: imgPath,
      dst: imgPath,
      cropWidth: elemenetWidth,
      cropHeight: elementHeight,
      x: elementX,
      y: elementY,
      gravity: 'North-West'
    },
    err => {
      if (err) throw err
    }
  )
}

export default saveElementScreenshot
