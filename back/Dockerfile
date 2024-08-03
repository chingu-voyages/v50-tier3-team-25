FROM node:20.16.0-slim



WORKDIR /back

COPY package*.json ./

RUN npm install

COPY . /back

EXPOSE 3001

CMD ["node", "index.js"]
