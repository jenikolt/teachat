FROM node:20.9.0
ARG NPM_CONFIG_REGISTRY=""
ARG YARN_REGISTRY=""
WORKDIR /app

COPY ../../package.json .
COPY ../../package-lock.json .
COPY ../.. .

RUN npm install --legacy-peer-deps

CMD [ "npm", "run", "build:backend" ]
CMD [ "npm", "run", "db:migration:run" ]
