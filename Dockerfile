FROM node:latest

COPY src /src
COPY package.json /package.json

WORKDIR /src/infrastructure/app

RUN npm install

EXPOSE 3000

docker build -t contenedor.

docker run -p 3000:3000 contenedor