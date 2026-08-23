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

# Seed runtime deps for standalone + bundled seed script (no full node_modules in runner).
RUN cp -r node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs .next/standalone/node_modules/ \
  && cp -r node_modules/.pnpm/dotenv@16.6.1/node_modules/dotenv .next/standalone/node_modules/
RUN pnpm run build:seed-bundle

# Isolated Prisma CLI with patched transitive deps for Trivy.
RUN mkdir -p /cli && cd /cli \
  && printf '%s\n' '{"dependencies":{"prisma":"7.9.1"},"overrides":{"deepmerge-ts":">=8.0.0","tar":">=7.5.21","brace-expansion":">=2.1.4","picomatch":">=4.0.4","ip-address":">=10.3.1","sigstore":">=4.1.1"}}' > package.json \
  && npm install --ignore-scripts \
  && npm cache clean --force \
  && rm -rf /root/.npm

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Remove bundled npm (not needed at runtime; reduces Trivy findings).
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs \
  && mkdir -p .next uploads /home/nextjs \
  && chown -R nextjs:nodejs .next uploads /home/nextjs

ENV HOME=/home/nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/src/db ./src/db
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-entrypoint.sh ./scripts/docker-entrypoint.sh
COPY --from=builder --chown=nextjs:nodejs /cli/node_modules /cli/node_modules

ENV PATH="/cli/node_modules/.bin:${PATH}"

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
