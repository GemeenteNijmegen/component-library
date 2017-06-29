# Nijmegen Component library

Go develop!

# Development environment
First make sure you install the node modules:

    docker-compose run --user="$UID" frontend yarn

Then start the development environment:

    docker-compose up

See the frontend on <http://localhost:3000>

# Production build

Generate a production build in `build/` with:

    docker-compose run --user="$UID" frontend yarn build


The (temporary) production enviroment is reachable on <http://nijmegen-component-library.s3-website-eu-west-1.amazonaws.com>.
