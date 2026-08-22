'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Inbox, Users, FileText, Sun, Moon, LogOut } from 'lucide-react';
import { AdminSidebar, useTheme } from '@repo/ui';
import { adminSignOutAction } from '../actions/auth.actions';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export const AdminLayoutWrapper: React.FC<AdminLayoutWrapperProps> = ({ children, user }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: 'Übersicht', href: '/admin', icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: 'Anfragen', href: '/admin/anfragen', icon: <Inbox className="h-4 w-4" /> },
    { label: 'Kunden', href: '/admin/kunden', icon: <Users className="h-4 w-4" /> },
    { label: 'Angebote', href: '/admin/angebote', icon: <FileText className="h-4 w-4" /> },
  ];

  const activeHref =
    navItems
      .filter((item) =>
        item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
      )
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? pathname;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar
        brandName="KiezWerk Admin"
        navItems={navItems}
        activeHref={activeHref}
        user={{
          name: user.name || 'Admin',
          email: user.email || '',
        }}
        className="min-h-screen border-r border-border shrink-0 hidden md:flex"
      />

      <div className="flex flex-1 flex-col min-w-0">
        <div
          role="status"
          className="border-b border-border bg-secondary px-4 py-2 text-center text-sm text-foreground"
        >
          Geschützter Demo-Adminbereich – Anmeldung erforderlich. Nicht für Produktion.
        </div>
        <header className="flex h-16 items-center justify-between border-b border-border/60 px-6 bg-card/50 backdrop-blur-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Demo-Daten · KiezWerk Berlin
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Theme umschalten"
            >
              {mounted && theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <form action={adminSignOutAction}>
              <button
                type="submit"
                className="flex h-9 items-center gap-2 rounded-lg border border-border px-3 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <LogOut className="h-4 w-4" />
                Abmelden
              </button>
            </form>
          </div>
        </header>
        <div key={pathname} className="admin-page-fade flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
