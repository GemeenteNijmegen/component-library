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

init: intro do-prepare-proxy do-install-git-hooks do-build do-init do-show-commands
build: intro do-build do-show-commands
start: intro do-start-proxy do-start do-connect-proxy do-check-hosts-file
start-static: intro do-static-stop do-static-build do-static-start
stop: intro do-stop do-disconnect-proxy
restart: intro do-restart
shell: intro do-open-shell
test: intro do-lint do-test
fix: intro do-fix
update: intro do-prepare-proxy do-switch-branch do-run-updates do-start
mr: intro do-checkout-mr do-run-updates do-start

create-release: intro do-create-release
create-changelog-file: intro do-create-changelog-file

test-regression: intro do-start do-regression-build do-regression-clear-screenshots do-regression-tests

# ===========================
# Snippets
# ===========================

set-ids = USERID=$$(id -u) GROUPID=$$(id -g)

REGRESSION_FAIL_FAST =
REGRESSION_FOCUS =
REGRESSION_PARALLEL =

ifdef fail-fast
REGRESSION_FAIL_FAST = --fail-fast
endif

ifdef focus
REGRESSION_FOCUS = --tags "@focus"
endif

ifndef focus
ifndef fail-fast
REGRESSION_PARALLEL = --parallel 10
endif
endif

# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "\n=== Make commands ===\n"
	@echo "Project:"
	@echo "    make init                               Initialise the project for development."
	@echo "    make start                              Start container."
	@echo "    make start-static                       Start static container."
	@echo "    make stop                               Stop container."
	@echo "    make restart                            Restart container."
	@echo "    make shell                              Open shell in frontend container."
	@echo "    make test                               Run jest tests."
	@echo "    make fix                                Fix auto fixable linting problems."
	@echo "    make update                             Update npm packages."
	@echo "    make update BRANCH=master               Switch branch and update npm packages."
	@echo "    make mr                                 Check out a MR from GitLab and update the project."
	@echo "Change log:"
	@echo "    make create-release                     Create a new release based on the changelog entries"
	@echo "    make create-changelog-file              Create a new changelog file in the unreleased folder"
	@echo "Regression:"
	@echo "    make test-regression                    Run the regression test"
	@echo "    make test-regression fail-fast=1        Stop on the first failure"
	@echo "    make test-regression focus=1            Only run tests tagged with '@focus'"

do-build:
	@echo "\n=== Building container ===\n"
	docker-compose build frontend

do-init:
	@echo "\n=== Initialisation ===\n"
	docker-compose run --rm frontend npm ci

do-start:
	@echo "\n=== Start container ===\n"
	docker-compose up -d frontend
	@echo "\n-> Your container is running on https://componenten.nijmegen.dev\n"

do-static-stop:
	@echo "\n=== Stop static container ===\n"
	docker-compose stop static

do-static-build:
	@echo "\n=== Building static container ===\n"
	VERSION=v`helpers/getVersion.sh` docker-compose build static

do-static-start:
	@echo "\n=== Start static container ===\n"
	docker-compose up -d static
	@echo "\n-> Your static container is running on http://localhost:3001\n"

do-stop:
	@echo "\n=== Stop container ===\n"
	docker-compose down

do-restart:
	@echo "\n=== Restart container ===\n"
	docker-compose restart

do-open-shell:
	@echo "\n=== Open shell in frontend container ===\n"
	docker-compose run --rm frontend sh

do-install-git-hooks:
	@echo "\n=== Installing git hooks ===\n"
	cp dev/git-hooks/* .git/hooks
	chmod +x .git/hooks/*

do-lint:
	@echo "\n=== Lint js ===\n"
	docker-compose run --rm frontend npm run lint-js && echo "> All files are formatted correctly"
	@echo "\n=== Lint sass ===\n"
	docker-compose run --rm frontend npm run lint-sass && echo "> All files are formatted correctly"

do-fix:
	@echo "\n=== Fix sass ===\n"
	docker-compose run --rm frontend npm run fix-sass && echo "> All files are formatted correctly"

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

do-create-release:
	@echo "\n=== Build component listing ===\n"
	docker-compose exec -e SKIP_GIT_TAG=true frontend npm run create-release

do-regression-build:
	@echo "\n=== Updating node modules for testing ===\n"
	${set-ids} docker-compose run --rm -u $$USERID:$$GROUPID --entrypoint "npm install" regression

do-regression-clear-screenshots:
	@echo "\n=== Clear old screenshots ===\n"
	bash -c "rm -rf test/regression/results/screenshots/{diff,compare,error}/*" && echo "Screenshots cleared"

do-regression-tests:
	@echo "\n=== Running regression tests ===\n"
	${set-ids} docker-compose run --rm -u $$USERID:$$GROUPID regression --world-parameters "`cat test/regression/defaults.json`" ${REGRESSION_FAIL_FAST} ${REGRESSION_FOCUS} ${REGRESSION_PARALLEL} || echo "\nTests failed"

do-create-changelog-file:
	@echo "\n=== Creating an unreleased changelog file ===\n"
	@cp dev/unreleased-changelog.template.yml changelogs/unreleased/`git rev-parse --abbrev-ref HEAD`.yml \
		&& echo 'Created a new unreleased changelog file'

# ===========================
# Hosts proxy
# ===========================

do-start-proxy:
	@echo "\n=== Start hosts proxy ===\n"
	@curl --silent https://raw.githubusercontent.com/Enrise/DevelopmentProxy/refs/heads/production/start.sh | sh

do-connect-proxy:
	@echo "\n=== Connect to hosts proxy ===\n"
	@docker network connect nijmegen development-proxy && echo "Connected." || true

do-stop-proxy:
	@echo "\n=== Stop hosts proxy ===\n"
	@docker container stop development-proxy && echo "Stopped." || true

do-disconnect-proxy:
	@echo "\n=== Disconnect from hosts proxy ===\n"
	@docker network disconnect nijmegen development-proxy && echo "Disconnected." || true

do-check-hosts-file:
	@cat /etc/hosts | grep componenten.nijmegen.dev> /dev/null \
	|| (echo "\n=== HOSTS MISSING ===\n\n \
	You are missing some hosts in your /etc/hosts file:" \
	"127.0.0.1 componenten.nijmegen.dev" \
	&& false)

do-prepare-proxy:
	@echo "\n=== Creating certificates ===\n"
	@mkdir -p ./dev/traefik-config/certs || true \
	&& cd ./dev/traefik-config/certs \
	&& (mkcert *.nijmegen.dev \
	&& echo "> certificates created") \
	|| echo "> could not create certificates, did you install mkcert?"
	@echo "\n=== Copy dev proxy config ===\n"
	@cp ./dev/traefik-config/nijmegen.yml ~/.development-proxy/config/nijmegen.yml
	@echo "> configuration copied"
	@cp ./dev/traefik-config/certs/* ~/.development-proxy/certs/
	@echo "> certificates copied"
