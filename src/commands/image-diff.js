import path from '../config/config'
import pixelMatch from 'pixelmatch'
import pngjs from 'pngjs'
import fs from 'fs'

const imageDiff = (testName, threshold = 0.0 ) => {
  return new Promise((resolve) => {
    // If baseline does not exist, copy comparison image to baseline
    if (!fs.existsSync(path.image.baseline(testName))) {
      fs.copyFileSync(path.image.comparison(testName), path.image.baseline(testName))
    }

    const comparisonImage = fs.createReadStream(path.image.comparison(testName))
      .pipe(new pngjs.PNG())
      .on('parsed', doneReading)
    const baselineImage = fs.createReadStream(path.image.baseline(testName))
      .pipe(new pngjs.PNG())
      .on('parsed', doneReading)
    let filesRead = 0

    function doneReading() {
      if (++filesRead < 2) return;

      const diffImage = new pngjs.PNG({width: baselineImage.width, height: baselineImage.height})
      const result = pixelMatch(
        baselineImage.data,
        comparisonImage.data,
        diffImage.data,
        baselineImage.width,
        baselineImage.height,
        { threshold },
        )
      
      if (result != 0) {
        diffImage.pack().pipe(fs.createWriteStream(path.image.diff(testName)));
      }
      
      resolve(result)
    }
  })
}

export default imageDiff
