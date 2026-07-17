FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN npm ci --omit=dev --workspace=backend

FROM node:24-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY apps/backend ./apps/backend

USER node

EXPOSE 3001

CMD ["node", "apps/backend/src/index.js"]
