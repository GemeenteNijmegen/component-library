FROM node:12.14-alpine

# install python for deasync@0.1.15
RUN apk add g++ make py3-pip

WORKDIR /app

# Expose port
EXPOSE 3000

# Start app
CMD npm run start
