import TestStatus from './test-status'

describe('Test Status', () => {
  it('should return pass when there is no pixel difference', () => {
    const testStatus = new TestStatus(0, 'TestName')
    expect(testStatus.testStatus).toEqual('pass')
  })

  it('should return fail when there is pixel differencea', () => {
    const testStatus = new TestStatus(100, 'TestName')
    expect(testStatus.testStatus).toEqual('fail')
  })
})
