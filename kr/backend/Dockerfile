FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS development
RUN npm ci
COPY . .
CMD ["node", "src/server.js"]

FROM base AS production
RUN npm ci --omit=dev
COPY . .
CMD ["node", "src/server.js"]
