FROM node:18-alpine

WORKDIR /app/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install --silent

COPY . .

ENV NODE_ENV=development

EXPOSE 3000
