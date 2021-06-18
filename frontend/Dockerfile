FROM node:14

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 8080

CMD [ "serve", "-s","build","-l","8080" ]