# E2E docker image used to run tests locally
FROM node:12.14.1

# Server created as part of the e2e tests to access a static html file
EXPOSE 4455

RUN apt-get update

# Install visual test dependencies
COPY package.json package-lock.json /project/
RUN apt-get install -y imagemagick
RUN npm install

WORKDIR /project
COPY . /project/

CMD npm run test:e2e
