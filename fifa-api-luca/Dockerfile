FROM node:18-alpine

COPY . .

RUN npm i --production

ENTRYPOINT ["npm", "start"]

ENV NODE_ENV="${ENVIRONMENT}"

EXPOSE 8080