FROM node:22-alpine AS builder

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run dev"]
