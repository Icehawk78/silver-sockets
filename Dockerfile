FROM node:14-alpine

# Make psql available
RUN apk --update add postgresql-client && rm -rf /var/cache/apk/*

# Create app dir
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY back_end/package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./back_end .

WORKDIR /front_end
COPY front_end/package*.json ./
RUN npm install

COPY ./front_end .
ENV REACT_APP_BACK_END_URL https://silver-sockets-ui.herokuapp.com
RUN npx react-scripts build && mv ./build /app/public

WORKDIR /app
RUN rm -r /front_end

EXPOSE 3001

CMD [ "npm", "start" ]
