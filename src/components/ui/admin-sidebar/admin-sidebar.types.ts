import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { adminSidebarVariants } from './admin-sidebar.styles';

export interface SidebarNavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface AdminSidebarProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof adminSidebarVariants> {
  brandName?: string;
  navItems: SidebarNavItem[];
  activeHref?: string;
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
}
