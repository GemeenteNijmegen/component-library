FROM node:12.14-alpine

WORKDIR /app

# Expose port
EXPOSE 3000

# Start app
CMD npm run start
