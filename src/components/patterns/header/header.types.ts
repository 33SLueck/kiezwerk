import type { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: ReactNode;
  navItems: NavItem[];
  actions?: ReactNode;
  className?: string;
}
