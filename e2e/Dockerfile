# E2E docker image used for CircleCI only
FROM node:12.14.1

ENV NPM_CONFIG_LOGLEVEL    warn
ENV NPM_CONFIG_UNSAFE_PERM true

RUN apt-get update

# Install visual test dependencies
RUN apt-get install -y imagemagick
