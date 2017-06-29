FROM node:8.1.2-alpine

# Create workdir
RUN mkdir -p /app
WORKDIR /app

# Add application
COPY package.json yarn.lock /app/
RUN yarn install --non-interactive && yarn cache clean
COPY . /app

# Expose port
EXPOSE 9000

# Start app
CMD yarn run start
