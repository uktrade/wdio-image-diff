import path from 'path'

const parentDirFolderName = 'visual-screenshots'
const parentDir = path.join(process.cwd(), parentDirFolderName)
const baseline = path.join(process.cwd(), parentDirFolderName, 'baseline')
const comparison = path.join(process.cwd(), parentDirFolderName, 'comparison')
const diff = path.join(process.cwd(), parentDirFolderName, 'diff')
const reportDir = path.join(process.cwd(), 'visual-report')

const paths = {
  image: {
    baseline: (testName) => { return path.join(baseline, `${testName}.png`) },
    comparison: (testName) => { return path.join(comparison, `${testName}.png`) },
    diff: (testName) => { return path.join(diff, `${testName}.png`) },
  },
  report: browser => { return path.join(reportDir, `visual-test-report-${browser}.html`) },
  css: () => { return path.join(path.resolve(__dirname), '..', 'reporter')},
  dir: {
    baseline,
    comparison,
    diff,
  },
  parentDir,
  reportDir,
}

export default paths
