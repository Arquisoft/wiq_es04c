FROM node:20

COPY . /app
WORKDIR /app

#Install the dependencies
RUN npm install

#tomar los valores de las variables de entorno del buildargs
ARG DEPLOY_HOST
ARG DEPLOY_PORT

ENV API_URI=http://${DEPLOY_HOST}:${DEPLOY_PORT}

#Create an optimized version of the webapp
RUN npm run build
RUN npm install serve

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]