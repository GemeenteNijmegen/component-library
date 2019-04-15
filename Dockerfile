FROM node:8.15.1-alpine

RUN apk add --no-cache git

# Create workdir
RUN mkdir -p /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Expose port
EXPOSE 3000

# Start app
CMD npm run start
