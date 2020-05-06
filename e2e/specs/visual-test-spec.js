const assert = require('assert')

describe('Visual test', () => {
  it('should compare entire page screenshot', async () => {
    await browser.url('/report')
    await browser.imageDiff.take()
    const result = await browser.imageDiff.validate()
    assert.equal(result, 0)
  })

  it('should compare element screenshot', async () => {
    await browser.url('/report')
    await browser.imageDiff.takeElement('h2')
    const result = await browser.imageDiff.validate()
    assert.equal(result, 0)
  })

  it('should remove element before taking screenshot', async () => {
    await browser.url('/report')
    const header = await $('#report-header')
    await header.waitForDisplayed(5000)
    await browser.imageDiff.hideElement('#report-header')
    await browser.imageDiff.take()
    const result = await browser.imageDiff.validate()
    assert.equal(result, 0)
  })
})
