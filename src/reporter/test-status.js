class TestStatus {
  constructor(status, name) {
    this.status = status
    this.name = name
  }

  get testStatus() {
    if (this.status === 0) {
      return 'pass'
    }
    return 'fail'
  }
}

export default TestStatus
