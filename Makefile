.PHONY: install run start build serve typecheck clear openapi.sync

# Path to backend-v2's BUNDLED OpenAPI spec — the single self-contained file
# (`make openapi` output, kept current by its openapi-check gate). The
# multi-file docs/openapi/openapi.yaml won't work here: Redoc can't resolve its
# external $refs. Override: make openapi.sync OPENAPI_SRC=/path/to/openapi.yaml
OPENAPI_SRC ?= ../../backend-v2/cmd/server/openapi.yaml

# Refresh the committed copy of the API spec that the /api reference renders.
openapi.sync:
	cp $(OPENAPI_SRC) static/openapi.yaml
	@echo "Synced static/openapi.yaml from $(OPENAPI_SRC)"

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
