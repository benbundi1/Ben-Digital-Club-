# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app

RUN corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml ./
COPY apps ./apps
COPY packages ./packages
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/web/.next /app/.next
COPY --from=builder /app/apps/web/public /app/public
COPY --from=builder /app/apps/web/package.json /app/package.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-H", "0.0.0.0", "-p", "3000"]
