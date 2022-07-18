



FROM node:12

# Create app directory, this is in our container/in our image
RUN mkdir /home/node/app
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3009
#CMD [ "node", "dist/main" ]
CMD [ "npm", "start" ]



