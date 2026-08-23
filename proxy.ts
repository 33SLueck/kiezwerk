import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './app/auth.config';

const { auth } = NextAuth(authConfig);

const createNonce = (): string => Buffer.from(crypto.randomUUID()).toString('base64');

const buildContentSecurityPolicy = (nonce: string): string => {
  const isDev = process.env.NODE_ENV === 'development';
  const scriptSrc = isDev
    ? `'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;

  return [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' data: https://images.unsplash.com https://*.cloudinary.com https://*.amazonaws.com`,
    `connect-src 'self'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
  ].join('; ');
};

const applySecurityHeaders = (response: NextResponse, csp: string, nonce: string): NextResponse => {
  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  return response;
};

const securePageResponse = (request: NextRequest): NextResponse => {
  const nonce = createNonce();
  const csp = buildContentSecurityPolicy(nonce);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  return applySecurityHeaders(response, csp, nonce);
};

const secureResponse = (response: NextResponse): NextResponse => {
  const nonce = createNonce();
  const csp = buildContentSecurityPolicy(nonce);
  return applySecurityHeaders(response, csp, nonce);
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
    return securePageResponse(request);
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
      return secureResponse(NextResponse.json({ error: 'Nicht authentifiziert.' }, { status: 401 }));
    }
    return securePageResponse(request);
  }

  if (isAuthRequired && isAdminUi) {
    if (!isLoggedIn && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', safeAdminCallbackPath(pathname));
      return secureResponse(NextResponse.redirect(loginUrl));
    }

    if (isLoggedIn && !isAdmin && !isLoginPage) {
      return secureResponse(NextResponse.redirect(new URL('/', request.url)));
    }

    if (isLoggedIn && isAdmin && isLoginPage) {
      return secureResponse(NextResponse.redirect(new URL('/admin', request.url)));
    }
  }

  return securePageResponse(request);
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
