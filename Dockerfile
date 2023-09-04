FROM node:18-alpine

WORKDIR /app

COPY fifa-api-luca/ /app

RUN npm i --production

ENTRYPOINT ["npm", "start"]

ENV NODE_ENV="${ENVIRONMENT}"

EXPOSE 8080
