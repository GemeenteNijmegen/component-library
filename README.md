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
-   A merge to master will result in a new version based on the highest version bump in the unreleased changelog files
-   Every new version that is created in master is deployed to acceptance and is available on the unique version url (.../vx.x.x)
-   Deployment to production needs a manual action which can be done in GitLab via Environments.

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

For 3rd party services there is a basic listing of all available components in the library. The listing is created when the component library is build.
You can test this by starting the static website and navigating to /vx.x.x/components-listing.html on that static environment

```shell
make start-static
```

## Changelog

All new changelog entries for component changes should go into yaml files under `changelogs/unreleased/`.

You should use your branch name as the filename, such as `GNIJ-155.yml`.

Each file should have the `versionBump` and `changes` key. See example below:

With the `versionBump` key you can define if the change should be a minor or a patch version. When using multiple files the highest bump is being used.

When merged into a release branch the version number is automatically bumped.

```yaml
versionBump: patch # patch, minor, major
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

The pipeline runs all jobs defined by the `preventDoublePipelineTrigger` snippet.

### On the master branch when there are unreleased changelog items:

When there are unreleased changelog items the pipeline will only run the update changelog job.

**Note:** This job will commit changes and starts a **new pipeline**.

### On the master branch when there are NO unreleased changelog items:

The pipeline runs all jobs defined by the `preventDoublePipelineTrigger` and the `push` and `deploy` stage
