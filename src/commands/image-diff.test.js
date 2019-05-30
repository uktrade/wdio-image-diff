import fs from 'fs'
import imageDiff from './image-diff'
import pixelmatch from 'pixelmatch'

jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
    copyFileSync: jest.fn(),
    createReadStream: jest.fn(),
    createWriteStream: jest.fn(),
  }
})

jest.mock('pixelmatch', () => {
  return {
    pixelMatch: jest.fn(),
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

  test('Image with no differences should return 0', () => {    
    pixelmatch.pixelMatch.mockReturnValue(0)
    const result = imageDiff('dummy')
    
    expect(result).resolves.toEqual(0)
  })

  test('Image with differences should return the pixel differences', () => {    
    pixelmatch.pixelMatch.mockReturnValue(10)
    const result = imageDiff('dummy')

    expect(result).resolves.toEqual(10)
  })
})
