import { cli } from './cli'
import { copySync, readdirSync } from 'fs-extra'

jest.mock('fs-extra', () => ({
  ...jest.requireActual('fs-extra'),
  copySync: jest.fn(),
  readdirSync: jest.fn(),
}))

describe('Cli', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Update baseline images', () => {
    it('should not update baseline images if argument is not specified', () => {
      cli(['--dummyArg1', '--dummyArg2'])
      expect(copySync).toHaveBeenCalledTimes(0)
    })

    it('should update baseline images if argument is specified', () => {
      readdirSync.mockReturnValue(['File1.png', 'File2.png'])

      cli(['--dummyArg1', '--dummyArg2', '-u'])
      expect(copySync).toHaveBeenCalledTimes(2)
    })

    it('should ignore the first 2 arguments', () => {
      cli(['-u', '-u'])
      expect(copySync).toHaveBeenCalledTimes(0)
    })
  })
})
