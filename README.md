# wdio-image-diff

This wrapper was created to make visual regression as simple as possible, by exposing basic functions that allow you to view the difference between images.
The wrapper uses [pixelmatch](https://github.com/mapbox/pixelmatch) which is simple and powerful and relies on a browser object of [webdriverIO](https://github.com/webdriverio) to take screenshots.

[![NPM Downloads][npm-downloads-image]][npm-url]

[![Build Status][circleci-image]][circleci-url]

[npm-downloads-image]: https://badgen.net/npm/dm/@uktrade/wdio-image-diff-js
[npm-url]: https://www.npmjs.com/package/@uktrade/wdio-image-diff-js
[circleci-url]: https://circleci.com/gh/uktrade/wdio-image-diff/tree/master
[circleci-image]: https://circleci.com/gh/uktrade/wdio-image-diff/tree/master.svg?style=svg

## Capabilities

- Compares 2 images
- Saves baseline if no baseline is present
- Creates a diff image in case of failure
- Works with any device/browser supported by wdio and your third party i.e saucelabs
- Force browser window size so it's not reliant on third party (size can be modified via options)
- Take screenshot of the whole page or for a given element

## Integration with webdriverIO

- in `wdio.conf.js` require the package: `const WdioImage = require ('@uktrade/wdio-image-diff-js').default`
- instantiate and expose the `wdioImageDiff` instance to the browser object:
  ```
  exports.config = {
    before: () => {
      const wdioImageDiff = new WdioImage(browser)
      browser.imageDiff = wdioImageDiff
    },
    beforeTest: (test) => {
      browser.imageDiff.testName = `${test.fullTitle} - ${browser.capabilities.browserName}`
    },
  }
  ```

## Dependencies

In order to use `takeElement(elementCssPath)` function you will need to
install imagemagick as we crop the full page screenshot in order to have
an image of a given element.

On Ubuntu

`$ apt-get install imagemagick`

On Mac OS X

`$ brew install imagemagick`

On CentOS

`$ yum install imagemagick`

## Writing a test

  ```
  const assert = require('assert')

  describe('Visual Test', () => {
    it('should visually check data hub home page is correct', async () => {
      // Navigate to a page (preferably mocked)
      await browser.url('')
      // Take a screenshot of the page (or element, see below)
      await browser.imageDiff.take()
      // Assert images have no pixel differences
      await browser.imageDiff.validate().then(result => {
        assert.equal(result, 0)
      })
    })
  })
  ```

### Notice

Alternatively you can use `takeElement(elementCssPath)` function if you want to
narrow down the area you are testing in the page.

## CLI

You can use wdio-image-diff client to update the baselines when needed. The way the baseline
images are updated is by copying the comparison images over to the baseline folder, simply run
the command below:

`$ wdio-image-diff -u`

It's important that you ensure the comparison image is the correct representation of the page
under test as it will be copied over to the baseline.

## Options

When instantiating the `WdioImage` you can provide an `options` object i.e:

```
const options = {
  width: 1024,
  height: 768,
  threshold: 0.1
}
const wdioImageDiff = new WdioImage(browser, options)
```

the default values if options or any of its keys is not provided are:
  - width: 1280
  - height: 870
  - threshold: 0.0

## Properties

Available properties used by methods of the class

`testName` # Default value set to 'Undefined test name'

## Reporting

Integration with wdio:

```
exports.config = {
  after: () => {
    browser.imageDiff.generateReport()
  },
}
```

A simple report can be generated after the suite is executed.
Screenshots will only be linked to a test on failures.

The report will look something like:

![WDIO Image Diff Report](report-example.png)


## Contributing

When committing please always use the following pattern for you messages (scope, body and footer are optional):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

| Commit message types (tags)                                                                                        | Release type              | Example                                                  |
|--------------------------------------------------------------------------------------------------------------------|---------------------------|----------------------------------------------------------|
| **feat**: A new feature                                                                                            | Minor release (0.**1**.0) | `feat: Add "Investment project" activity card`           |
| **fix**: A bug fix                                                                                                 | Patch release (0.0.**1**) | `fix: Remove default activity card`                      |
| **docs**: Documentation only changes                                                                               | None                      | `docs(README): Add testing instructions`                 |
| **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)  | None                      | `style: Use tabs instead of spaces`                      |
| **refactor**: A code change that neither fixes a bug nor adds a feature                                            | None                      | `refactor: Add missing props validation to ActivityFeed` |
| **perf**: A code change that improves performance                                                                  | None                      | `perf: Improve rendering speed of ActivityFeed`          |
| **test**: Adding missing or correcting existing tests                                                              | None                      | `test: Add integration tests to ActivityFeedCard`        |
| **build** Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)      | None                      | `build: Update webpack config`                           |
| **ci** Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) | None                      | `ci: Update CircleCI config`                             |
| **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation          | None                      | `chore: Update CircleCI config`                          |

To create a major/breaking (**1**.0.0) release, please add `BREAKING CHANGE` to the commit message body with some explanation, example message:

```
fix: Remove ActivityFeedApp component
BREAKING CHANGE: This components is no longer used so we removed it.
Optionally add more info in the second line of your message.
```