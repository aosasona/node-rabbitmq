FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

USER node

EXPOSE 21000

CMD ["yarn", "start"]