#FROM node:22-alpine AS base

## ── 1. Install deps ──────────────────────────────────────────────────────────
#FROM base AS deps
#RUN apk add --no-cache libc6-compat
#WORKDIR /app
#COPY package.json package-lock.json* ./
#RUN npm ci

## ── 2. Build ─────────────────────────────────────────────────────────────────
#FROM base AS builder
#WORKDIR /app
#COPY --from=deps /app/node_modules ./node_modules
#COPY . .
#RUN npm run build

## ── 3. Production runner ──────────────────────────────────────────────────────
#FROM base AS runner
#WORKDIR /app
#ENV NODE_ENV=production \
#    HOSTNAME="0.0.0.0"
#
#RUN apk add --no-cache wget   # ← add this
#
#RUN addgroup --system --gid 1001 nodejs \
# && adduser  --system --uid 1001 nextjs

#COPY --from=builder /app/public ./public
#RUN mkdir .next && chown nextjs:nodejs .next

# standalone output bundles the server + required node_modules
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
#COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

#USER nextjs
#ARG APP_PORT=3000
#EXPOSE ${APP_PORT}
#CMD ["node", "server.js"]


FROM node:22-alpine

WORKDIR /app

# Install dependencies (libc6-compat is often needed for native Node modules like SWC)
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the default Next.js port
EXPOSE 3000

# Run the Next.js dev server
CMD ["npm", "run", "dev"]
