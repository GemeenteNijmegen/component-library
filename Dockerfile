FROM node:10-alpine

RUN apk add --no-cache git bash

# Create workdir
RUN mkdir -p /app
WORKDIR /app

RUN git config --global user.email "epic@enrise.com"
RUN git config --global user.name "epic"

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD npm run start
