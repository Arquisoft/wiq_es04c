FROM node:20

COPY . /app
WORKDIR /app

#Install the dependencies
RUN npm install

# Take API_URI as a build argument
ARG API_URI

# Set API_URI as an environment variable
ENV API_URI=$API_URI

#Create an optimized version of the webapp
RUN npm run build
RUN npm install serve

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]