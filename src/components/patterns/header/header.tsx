'use client';

import * as React from 'react';
import type { HeaderProps } from './header.types';
import {
  getHeaderClasses,
  getHeaderInnerClasses,
  getNavListClasses,
  getNavLinkClasses,
} from './header.styles';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Menu, X } from 'lucide-react';

export const Header = ({ logo, navItems, actions, className }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className={getHeaderClasses(className)}>
      <div className={getHeaderInnerClasses()}>
        <div className="flex items-center gap-8">
          {logo ?? (
            <Link href="/" className="text-xl font-bold text-foreground">
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
        <div className="hidden md:flex items-center gap-4">
          {actions ? (
            actions
          ) : (
            <>
              <Button variant="ghost">Sign In</Button>
              <Button>Get Started</Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button
            type="button"
            className="text-foreground focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen ? (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
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
          <div className="pt-4 flex flex-col gap-2">
            <Button variant="ghost" fullWidth>
              Sign In
            </Button>
            <Button fullWidth>Get Started</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
};
