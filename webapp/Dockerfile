FROM node:20

COPY . /app
WORKDIR /app

#Install the dependencies
RUN npm install

# Take the values of the environment variables from the buildargs
ARG REACT_APP_API_URI

# Set the environment variable
ENV REACT_APP_API_URI=$REACT_APP_API_URI


#Create an optimized version of the webapp
RUN npm run build
RUN npm install serve

#Execute npm run prod to run the server
CMD [ "npm", "run", "prod" ]
#CMD ["npm", "start"]