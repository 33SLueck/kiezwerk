'use client';

import * as React from 'react';
import type { HeaderProps } from './header.types';
import {
  getHeaderClasses,
  getHeaderInnerClasses,
  getNavListClasses,
  getNavLinkClasses,
  getMobileMenuButtonClasses,
  getDesktopActionsClasses,
} from './header.styles';
import { Link } from '@/components/ui/link';
import { Menu, X } from 'lucide-react';

export const Header = ({ logo, navItems, actions, className }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className={getHeaderClasses(className)}>
      <div className={getHeaderInnerClasses()}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-8">
          {logo ?? (
            <Link href="/" className="shrink-0 text-xl font-bold text-foreground">
              Brand
            </Link>
          )}
          <nav className={getNavListClasses()}>
            {navItems.map((item, index) => (
              <Link key={index} href={item.href} className={getNavLinkClasses()}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {actions ? (
          <div className={getDesktopActionsClasses()}>{actions}</div>
        ) : null}
        <div className={getMobileMenuButtonClasses()}>
          <button
            type="button"
            className="text-foreground focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen ? (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav className="space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {actions ? (
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 [&>*]:w-full">
              {actions}
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
};
