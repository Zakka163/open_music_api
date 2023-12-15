FROM node:10-alpine
RUN mkdir  /home/app
WORKDIR /home/app
COPY ./* /home/app
RUN npm install




CMD npm run start-dev

