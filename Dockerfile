FROM node:18.0.0
WORKDIR /app-docker
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . . 

EXPOSE 3001

CMD ["node","server.js"]

