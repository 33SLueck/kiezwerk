'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Header, Footer, navigationConfig } from '@repo/ui';
import { siteConfig } from '@/lib/config/site';

export const SiteChrome = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const { navItems, footerColumns } = navigationConfig.business;

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Zum Inhalt springen
      </a>
      <div
        role="status"
        className="border-b border-border bg-secondary px-4 py-2.5 text-center text-sm text-foreground"
      >
        {siteConfig.demoBanner}
      </div>
      <Header
        logo={
          <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        }
        navItems={navItems}
      />
      <main id="main-content" className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer
        logo={
          <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        }
        columns={footerColumns}
      />
    </>
  );
};
