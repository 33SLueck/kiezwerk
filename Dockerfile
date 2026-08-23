FROM node:22-alpine AS base

FROM base AS builder
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN mkdir -p public uploads

ENV NEXT_TELEMETRY_DISABLED=1
ENV CI=false

# NEXT_PUBLIC_* must be present at build time (inlined into the client bundle).
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3002
ARG NEXT_PUBLIC_SITE_NAME=KiezWerk Berlin
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME

RUN pnpm db:generate
RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install -g pnpm@11.13.1 tsx prisma@7.9.1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p .next uploads /home/nextjs \
  && chown -R nextjs:nodejs .next uploads /home/nextjs

# Avoid pnpm trying to write into /app as non-root
ENV PNPM_HOME=/home/nextjs/.local/share/pnpm
ENV npm_config_cache=/home/nextjs/.npm
ENV HOME=/home/nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/src/db ./src/db
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh

# Minimal deps for entrypoint db push + seed
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

RUN chmod +x ./scripts/docker-entrypoint.sh

ENV PRISMA_QUERY_ENGINE_LIBRARY=/app/src/db/generated/client/libquery_engine-linux-musl-openssl-3.0.x.so.node
ENV UPLOAD_DIR=/app/uploads

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=3s --start-period=90s --retries=5 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/', (res) => process.exit(res.statusCode < 400 ? 0 : 1)).on('error', () => process.exit(1))"

ENTRYPOINT ["./scripts/docker-entrypoint.sh"]
