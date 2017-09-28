FROM node:8.4.0-alpine

# Create workdir
RUN mkdir -p /app
WORKDIR /app

# Expose port
EXPOSE 3000

# Start app
CMD yarn run start
