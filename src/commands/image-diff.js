import path from '../../config/config'
import fs from 'fs'
import pixelMatch from 'pixelmatch'
import pngjs from 'pngjs'

const imageDiff = (testName) => {
  return new Promise((resolve, reject) => {
    const comparisonImage = fs.createReadStream(path.comparisonImgPath(testName)).pipe(new pngjs.PNG()).on('parsed', doneReading)
    const baselineImage = fs.createReadStream(path.baselineImgPath(testName)).pipe(new pngjs.PNG()).on('parsed', doneReading)
    let filesRead = 0

    function doneReading() {
      if (++filesRead < 2) return;

      const diffImage = new pngjs.PNG({width: baselineImage.width, height: baselineImage.height})
      const result = pixelMatch(baselineImage.data, comparisonImage.data, diffImage.data, baselineImage.width, baselineImage.height)
      
      if (result != 0) {
        diffImage.pack().pipe(fs.createWriteStream(path.diffImgPath(testName)));
      }
      
      resolve(result)
    }
  })
}

export default imageDiff
