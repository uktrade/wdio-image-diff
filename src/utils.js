import fs from 'fs-extra'

const createDir = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

const cleanDir = dir => {
  if (fs.existsSync(dir)) {
    fs.emptyDirSync(dir)
  }
}

const readDir = dir => {
  return fs.readdirSync(dir)
}

export { createDir, cleanDir, readDir }
