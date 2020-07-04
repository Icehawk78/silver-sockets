FROM node:14-alpine

# Make psql available
RUN apk --update add postgresql-client && rm -rf /var/cache/apk/*

# Create app dir
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]
