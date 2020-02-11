# Tests

## Unit tests

For unit tests run:

`$ npm run test`

## E2E tests

### Setup

You will need to have a `.env` file with browserstack credentials setup, below
is a sample of the file environment variables:

```
BROWSERSTACK_USERNAME=username
BROWSERSTACK_ACCESS_KEY=accesskey
```

### Running the tests

In project root, run:

`$ docker build . -t visual-regression-test`
`$ docker run visual-regression-test`

***Notice: you will need to have a browserstack user/accesskey to be able to run the tests.
