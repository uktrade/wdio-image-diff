# E2E docker image used to run tests locally
FROM node:12.16.1

# Server created as part of the e2e tests to access a static html file
EXPOSE 4455

RUN apt-get update

# Install visual test dependencies
WORKDIR /project
COPY package.json package-lock.json /project/
RUN apt-get install -y imagemagick
RUN npm install

COPY . /project/

CMD npm run test:e2e
