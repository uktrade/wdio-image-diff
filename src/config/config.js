import path from 'path'

const paths = {
  baselineImgPath: (testName) => { return path.join(process.cwd(), 'visual-screenshots', 'baseline', `${testName}.png`) },
  comparisonImgPath: (testName) => { return path.join(process.cwd(), 'visual-screenshots', 'comparison', `${testName}.png`) },
  diffImgPath: (testName) => { return path.join(process.cwd(), 'visual-screenshots', 'diff', `${testName}.png`) },
}

export default paths
