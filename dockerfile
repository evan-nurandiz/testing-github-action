FROM node:16.14.0

# Create app directory
WORKDIR /apps

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN npm install
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
EXPOSE 3030

CMD [ "node", "dist/server.js" ]
