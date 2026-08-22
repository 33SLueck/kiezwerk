import type { NextAuthConfig } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      role?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
    id?: string;
  }
}

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    authorized: () => {
      // Return true to delegate route-specific redirects and checks to proxy.ts
      return true;
    },
  },
  providers: [], // Configured in auth.ts to keep this configuration edge-compatible
  // AUTH_SECRET is required — set in .env / Docker (see .env.example).
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours
  },
};
