import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './app/auth.config';

const { auth } = NextAuth(authConfig);

// SHA-256 hash of the static theme-init inline script in app/layout.tsx.
// Re-run: node -e "const c=require('crypto'),s=`<script-content>`;console.log(c.createHash('sha256').update(s).digest('base64'))"
// if the script ever changes.
const THEME_SCRIPT_HASH = "'sha256-UTDNpV3RLpJd/VIYBUGaUU3q9Vk8USwo6CZHBnQXeBs='";

const applySecurityHeaders = (response: NextResponse): NextResponse => {
  const nonce = crypto.randomUUID();
  response.headers.set('x-nonce', nonce);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content-Security-Policy
  // script-src: only same-origin + the exact hash of the static theme script (no unsafe-inline).
  const csp = [
    `default-src 'self'`,
    `script-src 'self' ${THEME_SCRIPT_HASH}`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' data: https://images.unsplash.com https://*.cloudinary.com https://*.amazonaws.com`,
    `connect-src 'self'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
  ].join('; ');
  response.headers.set('Content-Security-Policy', csp);

  // HSTS — only in production to avoid breaking local http dev
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  return response;
};

const safeAdminCallbackPath = (pathname: string): string => {
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    return pathname;
  }
  return '/admin';
};

export const proxy = auth(async (request) => {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname === '/_not-found' ||
    pathname === '/_global-error' ||
    pathname.includes('.')
  ) {
    return applySecurityHeaders(NextResponse.next());
  }

  const session = request.auth;
  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === 'ADMIN';
  const isAuthRequired = process.env.REQUIRE_ADMIN_AUTH === 'true';

  const isAdminApi = pathname.startsWith('/api/admin');
  const isAdminUi = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  if (isAuthRequired && isAdminApi) {
    if (!isLoggedIn || !isAdmin) {
      return applySecurityHeaders(
        NextResponse.json({ error: 'Nicht authentifiziert.' }, { status: 401 })
      );
    }
    return applySecurityHeaders(NextResponse.next());
  }

  if (isAuthRequired && isAdminUi) {
    if (!isLoggedIn && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', safeAdminCallbackPath(pathname));
      return applySecurityHeaders(NextResponse.redirect(loginUrl));
    }

    if (isLoggedIn && !isAdmin && !isLoginPage) {
      return applySecurityHeaders(NextResponse.redirect(new URL('/', request.url)));
    }

    if (isLoggedIn && isAdmin && isLoginPage) {
      return applySecurityHeaders(NextResponse.redirect(new URL('/admin', request.url)));
    }
  }

  return applySecurityHeaders(NextResponse.next());
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
