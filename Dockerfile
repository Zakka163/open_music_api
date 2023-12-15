FROM node:18-alpine
RUN mkdir  /home/app
WORKDIR /home/app
COPY / /home/app
RUN npm install 
RUN npm install nodemon -g




CMD npm run start-dev

