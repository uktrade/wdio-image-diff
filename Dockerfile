# E2E docker image used to run tests locally
FROM node:10.16.0

ENV NPM_CONFIG_LOGLEVEL    warn
ENV NPM_CONFIG_UNSAFE_PERM true

RUN mkdir -p /project
WORKDIR /project

ADD . /project/

# Server created as part of the e2e tests to access a static html file
EXPOSE 4455

RUN apt-get update

# Install visual test dependencies
RUN apt-get install -y imagemagick
RUN npm install

CMD npm run test:e2e
