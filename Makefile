.PHONY: install run start build serve typecheck clear

install:
	npm ci

run start:
	npm start

build:
	npm run build

serve: build
	npm run serve

typecheck:
	npm run typecheck

clear:
	npm run clear
