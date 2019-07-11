import createDir from './utils'
import fs from 'fs'

jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
    mkdirSync: jest.fn(),
  }
})

describe('Utils', () => {
  const args = 'some/path'

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create dir', () => {
    it('should trigger create directory function when path doesn\'t exist', () => {
      fs.existsSync.mockReturnValue(false)
      
      createDir(args)
      expect(fs.existsSync).toHaveBeenCalledTimes(1)
      expect(fs.mkdirSync).toHaveBeenCalledTimes(1)
      expect(fs.mkdirSync).toBeCalledWith(args)
    })
  
    it('should not trigger create directory function when path exists', () => {
      fs.existsSync.mockReturnValue(true)
      
      createDir(args)
      expect(fs.existsSync).toHaveBeenCalledTimes(1)
      expect(fs.mkdirSync).toHaveBeenCalledTimes(0)
    })
  })
})
