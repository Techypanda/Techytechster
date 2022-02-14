FROM node:alpine AS build

COPY . /app/
WORKDIR /app/

RUN npm install
EXPOSE 3000