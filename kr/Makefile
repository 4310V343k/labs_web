PROD_COMPOSE  = docker compose -f docker-compose.yml
DEV_COMPOSE   = docker compose -f docker-compose.dev.yml
NODE_IMAGE    = node:22-alpine

.PHONY: help \
        up down restart logs ps \
        dev dev-watch dev-down dev-logs \
        build build-prod build-dev \
        lock lock-backend lock-frontend \
        db-shell backend-shell frontend-shell

# --- Default ----------------------------------------------------------------

help:
	@grep -E '^[a-zA-Z_-]+:.*?##' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# --- Production -------------------------------------------------------------

up: ## Start production stack (detached)
	$(PROD_COMPOSE) up -d

down: ## Stop production stack
	$(PROD_COMPOSE) down

restart: ## Restart a service: make restart s=backend
	$(PROD_COMPOSE) restart $(s)

logs: ## Tail logs (all services, or: make logs s=backend)
	$(PROD_COMPOSE) logs -f $(s)

ps: ## Show running containers
	$(PROD_COMPOSE) ps

build-prod: ## Rebuild production images (no cache)
	$(PROD_COMPOSE) build --no-cache

# --- Development ------------------------------------------------------------

dev: ## Start dev stack (detached)
	$(DEV_COMPOSE) up -d --build

dev-watch: ## Start dev stack with Compose watch (auto-reload on src changes)
	$(DEV_COMPOSE) watch

dev-down: ## Stop dev stack
	$(DEV_COMPOSE) down

dev-logs: ## Tail dev logs (all services, or: make dev-logs s=backend)
	$(DEV_COMPOSE) logs -f $(s)

build-dev: ## Rebuild dev images (no cache)
	$(DEV_COMPOSE) build --no-cache

build: build-prod build-dev ## Rebuild all images

# --- Dependencies -----------------------------------------------------------

lock: lock-backend lock-frontend ## Regenerate all package-lock.json files

lock-backend: ## Regenerate backend/package-lock.json via a throwaway container
	docker run --rm \
		-v $(CURDIR)/backend:/app \
		-w /app \
		$(NODE_IMAGE) \
		npm install --package-lock-only

lock-frontend: ## Regenerate frontend/package-lock.json via a throwaway container
	docker run --rm \
		-v $(CURDIR)/frontend:/app \
		-w /app \
		$(NODE_IMAGE) \
		npm install --package-lock-only

# --- Shells -----------------------------------------------------------------

db-shell: ## Open psql inside the running db container
	$(DEV_COMPOSE) exec db psql -U $${DB_USER:-app} -d $${DB_NAME:-app_db}

backend-shell: ## Open a shell inside the running backend container
	$(DEV_COMPOSE) exec backend sh

frontend-shell: ## Open a shell inside the running frontend container
	$(DEV_COMPOSE) exec frontend sh
