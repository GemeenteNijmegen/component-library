# ===========================
# Default: help section
# ===========================

info: intro do-show-commands
intro:
	@echo ""
	@echo "███╗   ██╗██╗     ██╗███╗   ███╗███████╗ ██████╗ ███████╗███╗   ██╗"
	@echo "████╗  ██║██║     ██║████╗ ████║██╔════╝██╔════╝ ██╔════╝████╗  ██║"
	@echo "██╔██╗ ██║██║     ██║██╔████╔██║█████╗  ██║  ███╗█████╗  ██╔██╗ ██║"
	@echo "██║╚██╗██║██║██   ██║██║╚██╔╝██║██╔══╝  ██║   ██║██╔══╝  ██║╚██╗██║"
	@echo "██║ ╚████║██║╚█████╔╝██║ ╚═╝ ██║███████╗╚██████╔╝███████╗██║ ╚████║"
	@echo "╚═╝  ╚═══╝╚═╝ ╚════╝ ╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝"
	@echo "Component Library by enrise.com"

# ===========================
# Main commands
# ===========================

init: intro do-build do-init do-show-commands
build: intro do-build do-show-commands
start: intro do-start
stop: intro do-stop
test: intro do-test
update: intro do-switch-branch do-run-updates do-start
mr: intro do-checkout-mr do-run-updates do-start

update-icons: intro do-update-icons do-start
component-listing: intro do-component-listing

generate-changelog: intro do-generate-changelog

test-regression: intro do-start do-regression-build do-regression-tests

pre-commit: intro do-lint-staged do-commit-intro

# ===========================
# Snippets
# ===========================

set-ids = USERID=$$(id -u) GROUPID=$$(id -g)

ifdef fail-fast
REGRESSION_FAIL_FAST = --fail-fast
else
REGRESSION_FAIL_FAST =
endif

ifdef focus
REGRESSION_FOCUS = --tags "@focus"
else
REGRESSION_FOCUS = --parallel 10
endif

# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "\n=== Make commands ===\n"
	@echo "Project:"
	@echo "    make init                               Initialise the project for development."
	@echo "    make start                              Start container."
	@echo "    make stop                               Stop container."
	@echo "    make test                               Run jest tests."
	@echo "    make update                             Update npm packages."
	@echo "    make update BRANCH=master               Switch branch and update npm packages."
	@echo "    make mr                                 Check out a MR from GitLab and update the project."
	@echo "Build:"
	@echo "    make update-icons                       Update icons (only needed when an update of the icons dependency has been done)."
	@echo "    make component-listing                  Build the components listing locally."
	@echo "Change log:"
	@echo "    make generate-changelog version=x.x.x   Generate the changelog"
	@echo "    make generate-changelog version=x.x.x   Generate the changelog"
	@echo "Regression:"
	@echo "    make test-regression                    Run the regression test"
	@echo "    make test-regression fail-fast=1        Stop on the first failure"
	@echo "    make test-regression focus=1            Only run tests tagged with '@focus'"

do-build:
	@echo "\n=== Building container ===\n"
	docker-compose build

do-init:
	@echo "\n=== Initialisation ===\n"
	docker-compose run --rm frontend npm ci

do-start:
	@echo "\n=== Start container ===\n"
	docker-compose up -d frontend
	@echo "\n-> Your container is running on http://localhost:3000\n"

do-stop:
	@echo "\n=== Stop container ===\n"
	docker-compose down

do-test:
	@echo "\n=== Start the validator service ===\n"
	docker-compose up -d html-validator
	@echo "\n=== Run jest tests ===\n"
	docker-compose run --rm frontend npm test

do-switch-branch:
	@if [ -z $$BRANCH ]; then \
	    echo "\n=== Running updates for the current branch ===\n"; \
	    echo "No branch is set, run: 'make update BRANCH=<branch>' to checkout and update a branch"; \
	else \
	    echo "\n=== Switching to and updating $$BRANCH ===\n"; \
	    git checkout $$BRANCH; \
	    git pull upstream $$BRANCH; \
	fi

do-checkout-mr:
	@echo "\n=== GitLab Merge Request ===\n"
	@echo "What is the MR number you want to check?\n" \
	    && read -p "https://gitlab.enrise.com/Epic/nijmegen-component-library/merge_requests/" MR \
	    && echo "\n=== Checking out Merge Request $$MR ===\n" \
	    && git fetch upstream refs/merge-requests/$$MR/head:refs/remotes/upstream/merge-requests/$$MR \
	    && git checkout upstream/merge-requests/$$MR

do-run-updates:
	@echo "\n=== Updating project ===\n"
	docker-compose run --rm frontend npm ci

do-update-icons:
	@echo "\n=== Updating Material Design Icons listing ===\n"
	docker-compose run --rm frontend npm run build-icons-listing

do-component-listing:
	@echo "\n=== Build component listing ===\n"
	docker-compose exec frontend /app/node_modules/.bin/gulp fractal:build-components-listing

do-generate-changelog:
	@echo "\n=== Build component listing ===\n"
	docker-compose exec frontend npm run update-changelog ${version}

do-regression-build:
	@echo "\n=== Updating node modules for testing ===\n"
	mkdir test/regression/node_modules || true
	${set-ids} docker-compose run --rm --entrypoint "npm install" regression

do-regression-tests:
	@echo "\n=== Running regression tests ===\n"
	${set-ids} docker-compose run --rm regression --world-parameters "`cat test/regression/defaults.json`" ${REGRESSION_FAIL_FAST} ${REGRESSION_FOCUS} || echo "\nTests failed"

do-lint-staged:
	@echo "\n=== Checking codestyle and fixing where possible ===\n"
	@node_modules/.bin/lint-staged

do-commit-intro:
	@echo "\n=== Committing ===\n"
