import { generateTemplate } from '.'

jest.mock('../config/config', () => ({
  get css () {
    return jest.fn(() => { return 'some/path' })
  }
}))

describe('Reporter', () => {
  describe('create report', () => {
    it('should create html template', () => {
      const result = generateTemplate(
        { tests: [ { name: 'Visual Test 1', testStatus: 'pass' }, { name: 'Visual Test 2', testStatus: 'fail' } ]
      })
      expect(result).toMatchSnapshot()
    })
  })
})
