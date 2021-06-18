FROM node:14

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN chmod +x start.sh

EXPOSE 5000

CMD [ "node", "./build/backend.js" ]