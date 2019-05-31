import fs from 'fs'
import imageDiff from './image-diff'

jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
    copyFileSync: jest.fn(),
    createReadStream: jest.fn(),
    createWriteStream: jest.fn(),
  }
})

describe('Image diff', () => {
  let pipeMock = jest.fn()
  let onMock = jest.fn()

  beforeEach(() => {
    fs.createReadStream.mockReturnValue({ pipe: pipeMock })
    pipeMock.mockReturnValue({ on: onMock })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Image diff with baseline should not copy file', () => {
    fs.existsSync.mockReturnValue(true)
    imageDiff('dummy')

    expect(fs.createReadStream).toHaveBeenCalledTimes(2)
    expect(fs.existsSync).toHaveBeenCalledTimes(1)
    expect(fs.copyFileSync).toHaveBeenCalledTimes(0)
  })

  test('Image diff with no baseline should copy file', () => {    
    fs.existsSync.mockReturnValue(false)
    imageDiff('dummy')

    expect(fs.createReadStream).toHaveBeenCalledTimes(2)
    expect(fs.existsSync).toHaveBeenCalledTimes(1)
    expect(fs.copyFileSync).toHaveBeenCalledTimes(1)
  })
})
