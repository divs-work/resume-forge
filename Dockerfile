FROM node:22-alpine AS base

# ── 1. Install deps ──────────────────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ── 2. Build ─────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ── 3. Serve static export ────────────────────────────────────────────────────
FROM base AS runner
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/out ./out
ARG APP_PORT=3000
ENV APP_PORT=${APP_PORT}
EXPOSE ${APP_PORT}
CMD ["sh", "-c", "serve out -l ${APP_PORT}"]
