# Security Guide

This document covers the security posture of the `basewebrepo` template and provides guidance for hardening your ejected project.

---

## Table of Contents

- [Environment Variables](#environment-variables)
- [Input Sanitization](#input-sanitization)
- [Rate Limiting](#rate-limiting)
- [Admin Authentication](#admin-authentication)
- [Stripe Payment Integration](#stripe-payment-integration)
- [Content Security Policy (CSP)](#content-security-policy-csp)
- [Security Headers](#security-headers)
- [Order IDs](#order-ids)
- [Error Handling](#error-handling)
- [Docker Security](#docker-security)
- [Strapi Headless CMS Security](#strapi-headless-cms-security)
- [CI/CD Security](#cicd-security)
- [Dependency Management](#dependency-management)

---

## Environment Variables

All secrets and configuration are managed via environment variables. **Never commit real credentials to git.**

### Setup

```bash
cp .env.example .env
# Edit .env with your actual values
```

### Required Variables

| Variable                | Description                                                       | Required                              |
| ----------------------- | ----------------------------------------------------------------- | ------------------------------------- |
| `POSTGRES_USER`         | PostgreSQL username                                               | Yes (for Docker)                      |
| `POSTGRES_PASSWORD`     | PostgreSQL password                                               | Yes (for Docker)                      |
| `POSTGRES_DB`           | PostgreSQL database name                                          | Yes (for Docker)                      |
| `POSTGRES_PORT`         | PostgreSQL host port mapping                                      | Yes (for Docker)                      |
| `DATABASE_URL`          | Local Prisma / host development connection string                 | Yes                                   |
| `DATABASE_URL_DOCKER`   | Docker internal container connection string (`postgres:5432`)     | Yes (for Docker)                      |
| `SHOP_PORT`             | Host port mapping for Shop application                            | Yes (for Docker)                      |
| `ADMIN_PORT`            | Host port mapping for Admin application                           | Yes (for Docker)                      |
| `STRAPI_PORT`           | Host port mapping for Strapi CMS                                  | Yes (for Docker)                      |
| `PORT`                  | General application host port (used in ejected single-app setups) | Yes (for Docker)                      |
| `STRAPI_URL`            | Base URL of Strapi CMS instance                                   | Optional (enables CMS mode)           |
| `STRAPI_API_TOKEN`      | Read-only API Token for Strapi CMS                                | Optional (when Strapi requires token) |
| `STRIPE_SECRET_KEY`     | Stripe API secret key                                             | No (mock fallback)                    |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret                                     | No (mock fallback)                    |
| `REQUIRE_ADMIN_AUTH`    | Protect `/admin` and `/api/admin` via `proxy.ts`                  | No (default: true)                    |
| `AUTH_SECRET`           | Auth.js JWT/cookie signing secret                                 | Yes                                   |
| `NEXTAUTH_URL`          | Public site URL for Auth.js                                       | Yes (local Docker)                    |
| `NODE_ENV`              | Runtime environment                                               | No (default: development)             |

> **Important**: Database URLs are split by runtime: `DATABASE_URL` targets `localhost:${POSTGRES_PORT}` for local CLI / Prisma commands, while `DATABASE_URL_DOCKER` targets `postgres:5432` inside the Docker Compose network. `docker-compose.yml` uses `${VAR:?message}` syntax for all required compose values so missing variables fail fast immediately instead of using silent fallbacks.

---

## Input Sanitization

All user-facing form inputs are sanitized server-side before validation using the `sanitizeInput` utility from `@repo/ui`.

### What it does

- **Strips HTML tags** — prevents XSS via stored HTML injection
- **Escapes dangerous characters** — `<`, `>`, `&`, `"`, `'` are converted to HTML entities
- **Trims whitespace** — removes leading/trailing spaces
- **Enforces max length** — prevents oversized payloads

### Usage in your ejected project

```typescript
import { sanitizeInput, sanitizeFormData } from '@repo/ui';

// Single field
const cleanName = sanitizeInput(userInput, { maxLength: 200 });

// Entire form object
const cleanData = sanitizeFormData(formData, { maxLength: 1000 });
```

### Where it's applied

- Contact form validators (all apps)
- Checkout form validator (shop)
- Product search queries and slugs (shop)

---

## Rate Limiting

The template originally documented Redis-backed limits in `proxy.ts`. **This KiezWerk Berlin demo does not implement Redis rate limiting.** `proxy.ts` currently enforces admin auth redirects/401s and security headers only. Add rate limiting before production use.

---

## Admin Authentication

KiezWerk Berlin uses **Auth.js / NextAuth v5** (Credentials) with JWT sessions.

### Current State

- Auth is **on by default** via `REQUIRE_ADMIN_AUTH=true`
- [`proxy.ts`](proxy.ts) guards `/admin/*` (redirect to `/admin/login`) and `/api/admin/*` (401 JSON)
- Server helper [`src/lib/auth/require-admin.ts`](src/lib/auth/require-admin.ts) re-checks `session.user.role === 'ADMIN'` on admin APIs
- Dashboard layout under `app/admin/(dashboard)` redirects unauthenticated users to login
- Only users with role `ADMIN` can sign in (see `app/auth.ts`)
- Demo credentials come from seed / `ADMIN_EMAIL` + `ADMIN_PASSWORD` (see `.env.example`)

There is **no** `admin_token` cookie and no separate `apps/admin` package in this ejected project.

### Enabling / disabling

1. Ensure `AUTH_SECRET` and `NEXTAUTH_URL` are set
2. Keep `REQUIRE_ADMIN_AUTH=true` (recommended)
3. Log in at `/admin/login` with the seeded demo admin

To temporarily open the UI without proxy redirects (not recommended), set `REQUIRE_ADMIN_AUTH=false`. Admin APIs still call `requireAdmin()` and expect a valid ADMIN session.

#### Option B: Supabase Auth

1. Install Supabase:

   ```bash
   pnpm add @supabase/supabase-js @supabase/ssr
   ```

2. Create a Supabase client and use `supabase.auth.getSession()` in the proxy

#### Option C: Firebase Auth

1. Install Firebase Admin SDK
2. Verify ID tokens in the proxy middleware

> **Note**: The proxy already generates a CSP nonce (`x-nonce` header) that your auth provider can use for secure inline scripts.

---

## Stripe Payment Integration

### Current State (Template)

The shop app uses a **fallback mock pattern** when `STRIPE_SECRET_KEY` is not set:

- Real Stripe checkout sessions are created when the key exists
- A mock session ID is returned for development/testing when it doesn't

### Setting Up Real Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)

2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

3. Add to your `.env`:

   ```env
   STRIPE_SECRET_KEY=sk_test_... # Use sk_live_... for production
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. Set up webhook forwarding for local development:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

5. For production, configure the webhook endpoint in the Stripe Dashboard:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`

---

## Content Security Policy (CSP)

### Why CSP is not set at the application level

This template **does not** set a CSP header to avoid conflicts with downstream reverse proxy configurations (e.g., nginx). Many deployment setups manage CSP at the infrastructure level.

### Using the Nonce

The admin proxy generates a CSP nonce on every request (available via `x-nonce` response header). To use it with an nginx CSP:

```nginx
# nginx.conf
location / {
    proxy_pass http://admin:3002;

    # Read the nonce from upstream
    set $csp_nonce $upstream_http_x_nonce;

    # Set CSP with nonce
    add_header Content-Security-Policy "
      default-src 'self';
      script-src 'self' 'nonce-$csp_nonce';
      style-src 'self' 'unsafe-inline';
    " always;
}
```

### Adding CSP in the Ejected Project

If you manage CSP at the application level instead:

```typescript
// In your proxy.ts / middleware.ts
const nonce = crypto.randomUUID();
response.headers.set(
  'Content-Security-Policy',
  `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline';`
);
```

---

## Security Headers

The admin proxy sets the following security headers on every response:

| Header                   | Value                                      | Purpose                               |
| ------------------------ | ------------------------------------------ | ------------------------------------- |
| `X-Content-Type-Options` | `nosniff`                                  | Prevents MIME type sniffing           |
| `X-Frame-Options`        | `DENY`                                     | Prevents clickjacking via iframes     |
| `Referrer-Policy`        | `strict-origin-when-cross-origin`          | Controls referrer information leakage |
| `X-DNS-Prefetch-Control` | `off`                                      | Prevents DNS prefetching leaks        |
| `Permissions-Policy`     | `camera=(), microphone=(), geolocation=()` | Restricts browser API access          |

> **Recommendation**: Apply these same headers to all apps in your ejected project.

---

## Order IDs

### Current State

Order IDs use a simple numeric pattern: `ORD-XXXXXX` (6-digit random number). This is **intentionally weak** for demonstration purposes.

### Production Upgrade

Replace with cryptographically strong, non-guessable identifiers:

```typescript
// Option 1: crypto.randomUUID()
const orderId = crypto.randomUUID(); // e.g., "550e8400-e29b-41d4-a716-446655440000"

// Option 2: CUID (via @paralleldrive/cuid2)
import { createId } from '@paralleldrive/cuid2';
const orderId = createId(); // e.g., "clh3am3o3000008l5d4v1b2q3"

// Option 3: Database-generated (Prisma)
// The @id @default(cuid()) in schema.prisma already generates secure IDs
```

---

## Error Handling

All error responses return **generic messages** to clients. Internal error details are only logged server-side via `console.error`.

### Pattern

```typescript
// Correct — generic client message, detailed server log
catch (err: unknown) {
  console.error('Descriptive context:', err);
  return { error: 'Something went wrong. Please try again.' };
}

// Incorrect — leaks internal details to client
catch (err: any) {
  return { error: err.message };
}
```

---

## Docker Security

- **Pinned images**: All Dockerfiles use `node:22.17-alpine3.22` instead of floating `node:22-alpine`
- **Non-root user**: All containers run as `nextjs:nodejs` (UID/GID 1001)
- **Env var references**: `docker-compose.yml` uses `${VAR}` references — no hardcoded secrets
- **Dependabot**: Automated PRs for Docker base image updates

---

## CI/CD Security

The CI pipeline includes:

1. **`pnpm audit`** — Scans dependencies for known vulnerabilities
2. **CodeQL Analysis** — GitHub's static analysis for JavaScript/TypeScript security issues
3. **Dependabot** — Automated dependency update PRs for npm, Docker, and GitHub Actions

---

## Dependency Management

Dependabot is configured to monitor:

- **npm packages** — Weekly updates, max 10 PRs
- **Docker images** — Weekly updates for all Dockerfiles
- **GitHub Actions** — Weekly updates for CI workflow actions

Review and merge Dependabot PRs regularly to stay current with security patches.

---

## Strapi Headless CMS Security

When integrating Strapi CMS (`STRAPI_URL`):

1. **Development vs. Production Authentication Modes**:
   - **Development Mode**: `STRAPI_ENABLE_PUBLIC_READ=true` is enabled during initial bootstrap to automatically grant public read access (`find` and `findOne`). `STRAPI_API_TOKEN` can remain empty (`STRAPI_API_TOKEN=""`).
   - **Production Mode**: Set `STRAPI_ENABLE_PUBLIC_READ=false` in production. Generate a dedicated **Read-Only** API token in Strapi Admin (**Settings** → **API Tokens**) and configure `STRAPI_API_TOKEN` in `.env`.
2. **Invalid Token & Fallback Handling**:
   - If an invalid or unpermitted `STRAPI_API_TOKEN` is passed, Strapi responds with `401 Unauthorized`. The CMS utility (`packages/ui/src/lib/utils/cms.ts`) logs the authentication failure and falls back to static/database content so the application remains available.
3. **Read-Only API Tokens**:
   - Never grant write or admin permissions to client-side or public API tokens. Keep API tokens restricted strictly to `find` / `findOne` actions.
4. **CORS Whitelisting**:
   - In `config/middlewares.js` of Strapi, restrict origin CORS policies to your active frontend domain URLs.
5. **Environment Separation**:
   - Do not share Strapi API tokens across development, staging, and production environments. Provide unique, cryptographically strong tokens per deployment.

---

## Dependency Security & Audit Posture

The repository dependencies are scanned using `pnpm audit`.

### Audit Status Overview

- **Next.js Web Applications & Shared Packages**: **0 Vulnerabilities** across `apps/shop`, `apps/admin`, `apps/business`, `apps/portfolio`, `@repo/ui`, and `@repo/db`.
- **Strapi CMS REST API**: **0 Runtime Vulnerabilities**. Upgraded to Strapi v5.50.2, resolving all v4 SQL injection and relational filter vulnerability advisories.

### Transitive Build-Time Sub-Dependencies Analysis

A small set of 13 low/moderate/high transitive build-time sub-dependencies exist strictly within Strapi's internal Admin UI bundler pipeline (`@strapi/admin` → `vite` 5.4, `node-tar`, `lodash`):

| Severity     | Count | Module                              | Scope & Production Risk                                                                                |
| ------------ | ----- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Critical** | **1** | `tar` (node-tar)                    | Internal CLI data transfer tooling (`strapi export`/`import`). **Zero runtime risk** on web endpoints. |
| **High**     | **2** | `vite` (v5.4.21), `lodash`          | Windows dev-server path handling & template parsing. **Zero runtime risk** in production containers.   |
| **Moderate** | **8** | `esbuild`, `ajv`, `uuid`, `postcss` | Development server tools and admin dashboard build utilities.                                          |
| **Low**      | **2** | `elliptic`, `@ai-sdk`               | Deep transitive utility functions.                                                                     |

> **Recommendation**: Run `pnpm audit` periodically as part of continuous integration. Major runtime dependencies are pinned and patched.
