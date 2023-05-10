FROM node:19.9.0-slim
WORKDIR /usr/app

COPY . /usr/app/

RUN yarn install --prod --frozen-lockfile

RUN yarn run build
