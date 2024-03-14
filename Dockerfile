FROM node:16.20

ARG URL_MONGO_DB=${URL_MONGO_DB}

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PASSWORD=password \
    URL_MONGO_DB=${URL_MONGO_DB} \
    JWT_SECRET=nodejs123EnvFromDockerFile

WORKDIR /app

COPY package*.json ./

RUN echo $URL_MONGO_DB

RUN npm install

COPY . .

EXPOSE 5050

CMD ["npm","start"]