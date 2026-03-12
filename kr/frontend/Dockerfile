FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development: full deps, Vite dev server with HMR - source synced in by compose watch
FROM base AS development
RUN npm ci
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# Build: compile static assets
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# Production: Caddy serves the compiled static files
FROM caddy:2-alpine AS production
COPY --from=build /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
