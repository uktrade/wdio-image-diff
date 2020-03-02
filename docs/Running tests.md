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

`$ docker-compose build`
`$ docker-compose up`

***Notice: you will need to have a browserstack user/accesskey to be able to run the tests.

### Creating Docker container for CircleCI

```bash
export VERSION=1.0.0 # Increment this version each time when you edit Dockerfile.

docker login # Ask webops for Docker Hub access to the ukti group.
docker build -f e2e/Dockerfile -t wdio-diff-image-test .

docker tag wdio-diff-image-test:latest ukti/wdio-diff-image-test:${VERSION}
docker tag wdio-diff-image-test:latest ukti/wdio-diff-image-test:latest

docker push ukti/wdio-diff-image-test:${VERSION}
docker push ukti/wdio-diff-image-test:latest
```

You image should be now listed at [Docker Hub](https://cloud.docker.com/u/ukti/repository/docker/ukti/wdio-diff-image-test/tags).