FROM node:latest AS builder

WORKDIR /frontend

COPY package*.json .

RUN npm install
#RUN npm i -g serve

COPY . .
#RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev"]
