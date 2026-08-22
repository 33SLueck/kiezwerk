import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export type AdminSessionUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: string;
};

export type RequireAdminResult =
  | { ok: true; user: AdminSessionUser }
  | { ok: false; response: NextResponse };

/**
 * Server-side guard for /api/admin and admin server components.
 * Requires a valid Auth.js session with role ADMIN.
 */
export const requireAdmin = async (): Promise<RequireAdminResult> => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Nicht authentifiziert.' }, { status: 401 }),
    };
  }

  if (user.role !== 'ADMIN') {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Keine Berechtigung.' }, { status: 403 }),
    };
  }

  return { ok: true, user };
};
