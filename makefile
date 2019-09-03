# ===========================
# Default: help section
# ===========================

info: intro do-show-commands
intro:
	@echo "\n-- Nijmegen Component Library --\n"

# ===========================
# Main commands
# ===========================

init: intro do-build do-init do-show-commands
build: intro do-build do-show-commands
start: intro do-start
stop: intro do-stop
update-project: intro do-run-updates do-start
gitlab: intro do-checkout-mr do-run-updates do-start
update-icons: intro do-update-icons do-start
component-listing: intro do-component-listing
generate-changelog: intro do-generate-changelog

# ===========================
# Recipes
# ===========================

do-show-commands:
	@echo "\n=== Make commands ===\n"
	@echo "Project:"
	@echo "    make init                         Initialise the project for development."
	@echo "    make start                        Start container."
	@echo "    make stop                         Stop container."
	@echo "    make update-project               Update npm packages."
	@echo "    make gitlab MR=<number>           Check out a PR from GitLab and update the project."
	@echo "    make update-icons                 Update icons (only needed when an update of the icons dependency has been done)."
	@echo "    make component-listing            Build the components listing locally."
	@echo "    make generate-changelog v=x.x.x   Generate the changelog"

do-build:
	@echo "\n=== Building container ===\n"
	docker-compose build

do-init:
	@echo "\n=== Initialisation ===\n"
	docker-compose run --rm frontend npm ci

do-start:
	@echo "\n=== Start container ===\n"
	docker-compose up -d
	@echo "\n-> Your container is running on http://localhost:3000\n"

do-stop:
	@echo "\n=== Stop container ===\n"
	docker-compose down

do-checkout-mr:
ifndef MR
	$(error "No MR number is set, please run:\nmake gitlab MR=<number>")
else
	@echo "\n=== Checking out Merge Request ${MR} ===\n"
	git fetch upstream refs/merge-requests/${MR}/head:refs/remotes/upstream/merge-requests/${MR}
	git checkout upstream/merge-requests/${MR}
endif

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
