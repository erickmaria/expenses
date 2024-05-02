TZ='America/Los_Angeles'
DEFAULT_FOLDER=src/database/migrations
ROOTDIR := ${CURDIR}

.DEFAULT_GOAL := help

help:
	@echo "Please use 'make migrate-create NAME=value' to create a migration with a required argument."

.PHONY: migrate-create
migrate-create:
ifndef NAME
	$(error NAME is required. Please specify migration name like: NAME=value)
endif
	@docker run -it -v $(ROOTDIR):/tmp/ \
		alpine sh -c \
		"cd tmp && sh scripts/migrate/migrate.sh create ${NAME}"

.PHONY: migrate-create help