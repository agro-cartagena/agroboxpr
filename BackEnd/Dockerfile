FROM node

WORKDIR /app

COPY package.json ./

RUN yarn add nodemon && yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "run", "dev"]
