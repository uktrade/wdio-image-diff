import fs from 'fs'

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export default createDir
