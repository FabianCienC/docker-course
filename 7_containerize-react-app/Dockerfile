FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build




FROM nginx:1.27.0

COPY --from=build /app/build /usr/share/nginx/html
