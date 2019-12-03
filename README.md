# Nijmegen Component library

## Getting Started

Make sure you read the following:

-   [Sprint process](#sprint-process)
-   [Tooling](#what-tooling-do-i-need)
-   [How to start developing](#how-do-i-start-developing-for-the-fist-time)
-   [Visual regression testing](#visual-regression-testing)

### Sprint process

Our default process can be found out:
https://enrise.atlassian.net/wiki/spaces/TE/pages/647365322/Sprint+process+2018+edition

Changes for the component library:

-   Before merging an unreleased changelog entry is required for each change (see [Changelog](#changelog))
-   There are no review environments.
-   A merge to the latest major release branch can take place after technical review which will deploy to acceptance.
-   Deployment to production needs a manual action which can be done in GitLab via Environments. Current versions needs to be approved, new versions we can deploy directly.
-   All breaking changes do need a new version (which need a new release branch)

### What tooling do I need

Make sure you have installed the following:

-   [Docker with docker compose](https://docs.docker.com/install/) for local development
-   [GNU make](https://www.gnu.org/software/make/)

### How do I start developing for the fist time

Run the following command from the project root to automatically build and start the application using Docker:

```shell
make init
make start
```

The website should now be available on URL <http://localhost:3000>

### Visual regression testing

Next to the normal regression tests we use visual regression testing.
When you change the looks of a component the tests **will probably fail**!

#### how to update the reference image

1. Run the regression test with: `make test-regression` or `make test-regression fail-fast=1`
2. Check if the change is valid: `test/regression/results/screenshots/compare/<screenshotname>.png` and `test/regression/results/screenshots/diff/<screenshotname>.png`
3. Put the file from the `screenshot/compare` folder in the `screenshot/ref` overwriting the 'wrong' reference image
4. Run test again to see if it passes

#### Only test scenario's tagged with '@focus'

Tag the scenario with `@focus` and run `make test-regression focus=1`

```gherkin
    @focus
    Scenario: test
        When I open the component "test"
```

### Other Commands

Other useful commands can be found by running:

```shell
make info
```

## Update Material Design for Bootstrap

We want the scss to be packaged alongside our nijmegen styling so we can use mdb variables.
The whole `scss` folder of mdb can be placed in `src/scss/mdb`. Mdb tries to import custom styles so you need to remove this line from `mdb.scss`: `@import "custom-styles";`.

Some assets need to be placed in the static folder since we don't package those ourselves but just use the variant provided by mdb:

-   `js/bootstrap.min.js` -> `static/js`
-   `js/jquery.min.js` -> `static/js`
-   `js/mdb.min.js` -> `static/js`
-   `js/popper.min.js` -> `static/js`
-   `mdb-addons/mdb-lightbox-ui.html` -> `static/mdb-addons/mdb-lightbox-ui.html`
-   `mdb-addons/preloader.html` -> `static/mdb-addons/preloader.html`
-   `css/bootstrap.min.css` -> `static/css/bootstrap.min.css`

## Index listing of components

For 3rd party services it would be nice to have a basic listing of all available components in the library. A custom command has been created to facilitate in this functionality and is automatically run when deployed to acceptance and/or production. The url for this listing can be seen in the `Production build` section.

For debugging and/or testing purpose, it's possible to run this command manually:

```shell
make component-listing
```

## Versioning

There's versioning implemented for this CL in the infrastructure.

-   The versioning setup is only used for new major versions. Minor and patches shouldn't need a new major version
-   We should always try to avoid creating a new major version because this impacts all users of the CL.
-   Versioning is based on the release branches (e.g. release/1).
-   The version is included in the path (e.g. /v1/..)
-   We use a fork of the jwilder nginx proxy to have the routing based on path (see [this PR](https://github.com/jwilder/nginx-proxy/pull/1083))
-   The [versions landing page](public/versions.html) is manually updated to have control over which version is stable.

## Changelog

All new changelog entries for component changes should go into yaml files under `changelogs/unreleased/`.

You should use your branch name as the filename, such as `GNIJ-155.yml`.

Each file should have the `versionBump` and `changes` key. See example below:

With the `versionBump` key you can define if the change should be a minor or a patch version. When using multiple files the highest bump is being used.

When merged into a release branch the version number is automatically bumped.

```yaml
versionBump: patch # patch, minor
changes:
  - type: changed #changed, removed, added
    component: carousel
    description: Added something...
    what: [] # what has changed 1 or more of: [HTML, CSS, JS]
  - type: removed #changed, removed, added
    component: [footer, header]
    description: Removed...
```

The type must be changed, removed or added. The component must match the component folder/file name, and then a description of the change.

## Production build

Generate a production build in `build/` with:

    docker-compose run --rm frontend npm run build

Above command will also generate an HTML file with a full listing of available components within the library with the exception of the `Templates` folder, since these aren't components and merely example templates implementing various components from the library in one layout.

The listing can be seen at: https://componenten.nijmegen.nl/components-listing.html

## Docker Swarm

-   The Docker engine is setup as Swarm (with `docker swarm init`).
-   With `docker stack deploy` we rollout our container.
-   `docker service ls` shows the currently running services (containers).

## Hosting

-   Cobytes is responsible for the hosting environment.
-   We (Enrise) have SSH access and access to the Docker daemon.
-   SSH access is only available via a jumphost and required your public key to be present on the server.

### Acceptance

-   URL: <https://componenten.acc.nijmegen.nl/>
-   Server: acc01.nijmegen.cobytes.io
-   SSH User: enrise-docker-deploy
-   SSH into the server:

```shell
ssh -o ProxyCommand="ssh -W %h:%p -q enrise@jump01.nijmegen.cobytes.io" enrise-docker-deploy@acc01.nijmegen.cobytes.io
```

### Production

-   URL: <https://componenten.nijmegen.nl/>
-   Server: containerprod01.nijmegen.cobytes.io
-   SSH User: enrise-docker-deploy
-   SSH into the server:

```shell
ssh -o ProxyCommand="ssh -W %h:%p -q enrise@jump01.nijmegen.cobytes.io" enrise-docker-deploy@containerprod01.nijmegen.cobytes.io
```

## Pipeline

This is how the pipeline behaves:

### On all feature branches:

The pipeline runs all jobs defined by the `runOnBranch` snippet.

### On the release branch when there are unreleased changelog items:

When there are unreleased changelog items the pipeline will only run the update changelog job.

**Note:** This job will commit some changes and starts a **new pipeline**.

### On the release branch when there are NO unreleased changelog items:

The pipeline runs all jobs defined by the `runOnBranch` and `runOnRelease` snippets.

On the release branch the jobs with the `runManualOnRelease` snippet can be started manually
