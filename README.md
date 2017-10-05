# Nijmegen Component library

Go develop!

# Development environment
First make sure you install the node modules:

    docker-compose run --user="$UID" frontend yarn

Then start the development environment:

    docker-compose up

See the frontend on <http://localhost:3000>

## Production build

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
