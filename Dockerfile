FROM node:8.1.2-alpine

# Create workdir
RUN mkdir -p /app
WORKDIR /app

# Expose port
EXPOSE 9000

# Start app
CMD yarn run start
