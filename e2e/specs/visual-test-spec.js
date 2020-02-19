const assert = require('assert')

describe('Visual test', () => {
  it('should compare entire page screenshot', async () => {
    await browser.url('/report')
    await browser.imageDiff.take()
    await browser.imageDiff.validate().then((result) => {
      assert.strictEqual(result, 0)
    })
  })

  it('should compare element screenshot', async () => {
    await browser.url('/report')
    await browser.imageDiff.takeElement('h2')
    await browser.imageDiff.validate().then((result) => {
      assert.strictEqual(result, 0)
    })
  })

  it('should remove element before taking screenshot', async () => {
    await browser.url('/report')
    await browser.imageDiff.hideElement('#report-header')
    await browser.imageDiff.take()
    await browser.imageDiff.validate().then((result) => {
      assert.strictEqual(result, 0)
    })
  })
})