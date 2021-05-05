FROM node:15

WORKDIR /app

COPY package.json ./

RUN yarn add nodemon && yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "run", "dev"]