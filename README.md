# Nijmegen Component library

Go develop!

- [Nijmegen Component library](#nijmegen-component-library)
- [Getting Started](#getting-started)
  - [Sprint process](#sprint-process)
  - [What tooling do I need](#what-tooling-do-i-need)
  - [How do I start developing for the fist time](#how-do-i-start-developing-for-the-fist-time)
  - [Other Commands](#other-commands)
- [Update Material Design Icons listing](#update-material-design-icons-listing)
- [Update Material Design for Bootstrap](#update-material-design-for-bootstrap)
- [Index listing of components](#index-listing-of-components)
- [Versioning](#versioning)
- [Changelog](#changelog)
- [Production build](#production-build)
- [Docker Swarm](#docker-swarm)
- [Hosting](#hosting)
  - [Acceptance](#acceptance)
  - [Production](#production)

# Getting Started

## Sprint process

Our default process can be found out:
https://enrise.atlassian.net/wiki/spaces/TE/pages/647365322/Sprint+process+2018+edition

Changes for eSf:

-   There are no review environments.
-   A merge to master can take place after technical review which will deploy to acceptance.
-   Deployment to production needs a manual action which can be done in GitLab via Environments.

## What tooling do I need

Make sure you have installed the following:

-   [Docker with docker compose](https://docs.docker.com/install/) for local development
-   [GNU make](https://www.gnu.org/software/make/)

## How do I start developing for the fist time

Run the following command from the project root to automatically build and start the application using Docker:

```shell
make init
make start
```

The website should now be available on URL <http://localhost:3000>

## Other Commands

Other useful commands can be found by running:

```shell
make info
```

# Update Material Design Icons listing

Nijmegen isn't using the icons that come with the MDBootstrap framework.
As a substitute Material Design Icons (https://materialdesignicons.com) is added as a dependency to this framework.

In order to see which icons are supported, a build target is available to generate a full listing based on the icons SVG file.

```shell
make update-icons
```

By issuing above command, `components/icons/icons.hbs` will be populated with HTML icons based on all the available glyphs in `node_modules/mdi/fonts/materialdesignicons-webfont.svg`.

**Note**: this command is only needed when an update of the icons dependency has been done.

# Update Material Design for Bootstrap

As of version 4.5.0, separation of the MDB framework Sass files and the custom Nijmegen Sass files has been improved a lot.
MDB framework now imports by default a `custom` file (in `src/mdbootstrap-pro/v4.5.0/scss/mdb.scss`) and with this addition it's easier to point to the custom Nijmegen styling as defined in: `src/scss/nijmegen/custom.scss`.

**Note**: When updating to a newer version of MDB, it's best to remove the `scss/_custom.scss` file from the MDB library so it can't conflict with the custom Nijmegen styling.

# Index listing of components

For 3rdparty services it would be nice to have a basic listing of all available components in the library. A custom command has been created to facilitate in this functionality and is automatically run when deployed to acceptance and/or production. The url for this listing can be seen in the `Production build` section.

For debugging and/or testing purpose, it's possible to run this command manually:

```shell
make component-listing
```

# Versioning

There's versioning implemented for this CL in the infrastructure.

-   The versioning setup is only used for new major versions. Minor and patches shouldn't need a new major version
-   We should aways try to avoid creating a new major version because this impacts all users of the CL.
-   Versioning is based on the release branches (e.g. release/1).
-   The version is included in the path (e.g. /v1/..)
-   We use a fork of the jwilder nginx proxy to have the routing based on path (see [this PR](https://github.com/jwilder/nginx-proxy/pull/1083))
-   The [versions landingspage](public/versions.html) is manually updated to have control over which version is stable.

# Changelog

To avoid changelog conflicts, we use a system similar to that used by GitLab:
https://about.gitlab.com/2018/07/03/solving-gitlabs-changelog-conflict-crisis/

All new changelog entries for component changes should go into yaml files under `changelogs/unreleased/`.

You should use your branch name as the filename, such as `GNIJ-155.yml`.

Each file should start with `changes:`, and then contain a list of changes underneath:

```yaml
changes:
    - type: added #changed, removed, added
      component: carousel
      description: Added something...
    - type: removed #changed, removed, added
      component: footer
      description: Removed...
```

The type must be changed, removed or added. The component must match the component folder/file name, and then a description of the change.

Changelog entries within the unreleased folder will then get compiled into `docs/03-Changelog.md` when they are merged into a release/x branch.

# Production build

Generate a production build in `build/` with:

    docker-compose run --rm frontend yarn build

Above command will also generate an HTML file with a full listing of available components within the library with the exception of the `Templates` folder, since these aren't components and merely example templates implementing various components from the library in one layout.

The listing can be seen at: https://componenten.nijmegen.nl/components-listing.html

# Docker Swarm

-   The Docker engine is setup as Swarm (with `docker swarm init`).
-   With `docker stack deploy` we rollout our container.
-   `docker service ls` shows the currently running services (containers).

# Hosting

-   Cobytes is responsible for the hosting environment.
-   We (Enrise) have SSH access and access to the Docker daemon.
-   SSH access is only available via a jumphost and required your public key to be present on the server.

## Acceptance

-   URL: <https://componenten.acc.nijmegen.nl/>
-   Server: acc01.nijmegen.cobytes.io
-   SSH User: enrise-docker-deploy
-   SSH into the server:

```shell
ssh -o ProxyCommand="ssh -W %h:%p -q enrise@jump01.nijmegen.cobytes.io" enrise-docker-deploy@acc01.nijmegen.cobytes.io
```

## Production

-   URL: <https://componenten.nijmegen.nl/>
-   Server: containerprod01.nijmegen.cobytes.io
-   SSH User: enrise-docker-deploy
-   SSH into the server:

```shell
ssh -o ProxyCommand="ssh -W %h:%p -q enrise@jump01.nijmegen.cobytes.io" enrise-docker-deploy@containerprod01.nijmegen.cobytes.io
```
