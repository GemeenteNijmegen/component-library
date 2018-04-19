# Nijmegen Component library

Go develop!

# Development environment
First make sure you install the node modules:

    docker-compose run --user="$UID" frontend yarn

Then start the development environment:

    docker-compose up

See the frontend on <http://localhost:3000>

## Update Material Design Icons listing

Nijmegen isn't using the icons that come with the MDBootstrap framework.
As a substitute Material Design Icons (https://materialdesignicons.com) is added as a dependency to this framework.

In order to see which icons are supported, a build target is available to generate a full listing based on the icons SVG file.

    docker-compose run frontend yarn build-icons-listing

By issuing above command, `components/icons/icons.hbs` will be populated with HTML icons based on all the available glyphs in `node_modules/mdi/fonts/materialdesignicons-webfont.svg`.

**Note**: this command is only needed when an update of the icons dependency has been done.

## Update Material Design for Bootstrap

As of version 4.5.0, separation of the MDB framework Sass files and the custom Nijmegen Sass files has been improved a lot.
MDB framework now imports by default a `custom` file (in `src/mdbootstrap-pro/v4.5.0/scss/mdb.scss`) and with this addition it's easier to point to the custom Nijmegen styling as defined in: `src/scss/nijmegen/custom.scss`.

**Note**: When updating to a newer version of MDB, it's best to remove the `scss/_custom.scss` file from the MDB library so it can't conflict with the custom Nijmegen styling.

# Production build

Generate a production build in `build/` with:

    docker-compose run --user="$UID" frontend yarn build

# Deployment

Deployment is handled by GitLab CI.

* A commit/merge in master will trigger an automatic deploy to acceptance
* Deployment to production needs a manual action which can be done in GitLab via Environments.

## Docker Swarm
* The Docker engine is setup as Swarm (with `docker swarm init`).
* With `docker stack deploy` we rollout our container.
* `docker service ls` shows the currently running services (containers).

# Hosting

* Cobytes is responsible for the hosting environment.
* We (Enrise) have SSH access and access to the Docker daemon.
* SSH access is only available via a jumphost and required your public key to be present on the server.

## Acceptance

* URL: <https://componenten.acc.nijmegen.nl/>
* Server: acc01.nijmegen.cobytes.io
* SSH User: enrise-docker-deploy
* SSH into the server:
```shell
ssh -o ProxyCommand="ssh -W %h:%p -q enrise@jump01.nijmegen.cobytes.io" enrise-docker-deploy@acc01.nijmegen.cobytes.io
```

## Production

* URL: <https://componenten.nijmegen.nl/>
* Server: containerprod01.nijmegen.cobytes.io
* SSH User: enrise-docker-deploy
* SSH into the server:
```shell
ssh -o ProxyCommand="ssh -W %h:%p -q enrise@jump01.nijmegen.cobytes.io" enrise-docker-deploy@containerprod01.nijmegen.cobytes.io
```
