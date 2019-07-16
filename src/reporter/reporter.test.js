import { generateTemplate } from './reporter'

describe('Reporter', () => {
  describe('create report', () => {
    it('should create html template', () => {
      const result = generateTemplate(
        { tests: [ { name: 'Visual Test 1', state: 'pass' }, { name: 'Visual Test 2', state: 'fail' } ]
      })
      expect(result).toMatchSnapshot()
    })
  })
})
