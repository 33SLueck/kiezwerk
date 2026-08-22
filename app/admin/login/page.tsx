'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Input, Card, Heading, Text, Alert } from '@repo/ui';
import { signIn } from 'next-auth/react';

const DEMO_EMAIL = 'demo.admin@kiezwerk.example';
const DEMO_PASSWORD = 'DemoAdmin123!';

const safeCallbackUrl = (raw: string | null): string => {
  if (!raw) return '/admin';
  if (!raw.startsWith('/admin')) return '/admin';
  if (raw.startsWith('/admin/login')) return '/admin';
  if (raw.startsWith('//') || raw.includes('://')) return '/admin';
  return raw;
};

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get('callbackUrl'));

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const res = await signIn('credentials', {
      email: email.trim(),
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (res?.error) {
      setError('Ungültige Admin-E-Mail oder Passwort.');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <Card className="w-full max-w-md p-8 shadow-md border border-border bg-card">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Heading level={2} size="lg" className="text-foreground">
            Admin-Anmeldung
          </Heading>
          <Text as="p" className="text-sm text-muted-foreground">
            Melden Sie sich mit den Demo-Admin-Zugangsdaten an.
          </Text>
        </div>

        {error && <Alert variant="destructive">{error}</Alert>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-foreground">
              E-Mail
            </label>
            <Input
              id="email"
              type="email"
              placeholder={DEMO_EMAIL}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-foreground">
              Passwort
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full mt-2" disabled={isSubmitting}>
            {isSubmitting ? 'Anmeldung…' : 'Anmelden'}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Demo-Zugangsdaten:{' '}
          <code className="bg-muted px-1 py-0.5 rounded text-foreground">{DEMO_EMAIL}</code> /{' '}
          <code className="bg-muted px-1 py-0.5 rounded text-foreground">{DEMO_PASSWORD}</code>
        </p>
      </div>
    </Card>
  );
};

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <React.Suspense fallback={<div className="text-center p-4">Anmeldung wird geladen…</div>}>
        <LoginForm />
      </React.Suspense>
    </div>
  );
};

export default AdminLoginPage;
