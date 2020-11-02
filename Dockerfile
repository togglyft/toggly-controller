FROM node:12-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ENV NODE_ENV=production

COPY src src
COPY server.js .
COPY src/configuration/configuration.yaml /etc/toggly/controller/conf/configuration.yaml
RUN rm src/configuration/configuration.yaml
RUN ln -fs /etc/toggly/controller/conf/configuration.yaml src/configuration/configuration.yaml

EXPOSE 4000
CMD [ "node", "server.js" ]