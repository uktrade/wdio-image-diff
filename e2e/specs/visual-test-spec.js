const assert = require('assert')

const staticReportUrl = 'https://80854-83823675-gh.circle-artifacts.com/0/visual-report/visual-test-report-chrome.html'

describe('Visual test', () => {
  it('should compare entire page screenshot', async () => {
    await browser.url(staticReportUrl)
    await browser.imageDiff.take()
    const result = await browser.imageDiff.validate()
    assert.equal(result, 0)
  })

  it('should compare element screenshot', async () => {
    await browser.url(staticReportUrl)
    await browser.imageDiff.takeElement('h2')
    const result = await browser.imageDiff.validate()
    assert.equal(result, 0)
  })

  it('should remove element before taking screenshot', async () => {
    await browser.url(staticReportUrl)
    const header = await $('#report-header')
    await header.waitForDisplayed(5000)
    await browser.imageDiff.hideElement('#report-header')
    await browser.imageDiff.take()
    const result = await browser.imageDiff.validate()
    assert.equal(result, 0)
  })
})
