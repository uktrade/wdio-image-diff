import path from 'path'

const paths = {
  baselineImgPath: (testName) => { return path.resolve(__dirname, '..', 'screenshots', 'baseline', `${testName}.png`) },
  comparisonImgPath: (testName) => { return path.resolve(__dirname, '..', 'screenshots', 'comparison', `${testName}.png`) },
  diffImgPath: (testName) => { return path.resolve(__dirname, '..', 'screenshots', 'diff', `${testName}.png`) },
}

export default paths
