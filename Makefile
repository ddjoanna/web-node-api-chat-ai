#!make

include .env
export $(shell sed 's/=.*//' .env)

DOCKER_COMPOSE_FILE ?= docker-compose.yml

#========================#
#== DEVELOPMENT ==#
#========================#

up:
	docker compose -f ${DOCKER_COMPOSE_FILE} up -d --remove-orphans
	make import

down:
	docker compose -f ${DOCKER_COMPOSE_FILE} down

import:
	npm run import

dev:
	npm run dev

#========================#
#== RUN ==#
#========================#
run:
	npm run start