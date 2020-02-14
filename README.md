# wdio-image-diff

This wrapper was created to make visual regression as simple as possible, by exposing basic functions that allow you to view the difference between images.
The wrapper uses [pixelmatch](https://github.com/mapbox/pixelmatch) which is simple and powerful and relies on a browser object of [webdriverIO](https://github.com/webdriverio) to take screenshots.

[![NPM Downloads][npm-downloads-image]][npm-url]

[![Build Status][circleci-image]][circleci-url]

[npm-downloads-image]: https://badgen.net/npm/dm/@uktrade/wdio-image-diff-js
[npm-url]: https://www.npmjs.com/package/@uktrade/wdio-image-diff-js
[circleci-url]: https://circleci.com/gh/uktrade/wdio-image-diff/tree/master
[circleci-image]: https://circleci.com/gh/uktrade/wdio-image-diff/tree/master.svg?style=svg

## Table of contents

- [Contributing](./docs/CONTRIBUTING.md)
- [Publishing](./docs/Publishing.md)
- [Running tests](./docs/Running%20tests.md)
- [WDIO integration](./docs/WDIO%20integration.md)
- [Reporting](./docs/Reporting.md)
- [CLI](./docs/CLI.md)

## Capabilities

- Compares 2 images
- Saves baseline if no baseline is present
- Creates a diff image in case of failure
- Works with any device/browser supported by wdio and your third party i.e saucelabs
- Force browser window size so it's not reliant on third party (size can be modified via options)
- Take screenshot of the whole page or for a given element

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
