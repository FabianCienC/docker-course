FROM node:22-alpine

WORKDIR /app

COPY package*.json .
RUN npm ci
COPY . .
ENV PORT=5000
ENV NAME="My awesome app "
CMD [ "node", "src/index.js" ]