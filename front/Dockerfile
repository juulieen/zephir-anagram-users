FROM node:14.18-alpine

WORKDIR /app

COPY ./package*.json ./

RUN yarn

COPY . .

RUN yarn build

CMD yarn start