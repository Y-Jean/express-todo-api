FROM node:23

RUN apt-get update && apt-get install -y openssl

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
