'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { Link } from '@/components/ui/link';
import { Badge } from '@/components/ui/badge';
import { adminSidebarVariants } from './admin-sidebar.styles';
import type { AdminSidebarProps } from './admin-sidebar.types';

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  brandName = 'Nexus CMS',
  navItems,
  activeHref,
  user,
  variant,
  className,
  ...props
}) => {
  return (
    <aside className={cn(adminSidebarVariants({ variant }), className)} {...props}>
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-2 px-3 py-4 border-b border-border/60 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            N
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">{brandName}</span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors no-underline',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                )}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon && <span className="h-4 w-4 shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <Badge
                    variant={isActive ? 'secondary' : 'default'}
                    size="sm"
                    className="text-[10px] px-1.5 py-0.2"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Profile */}
      {user && (
        <div className="flex items-center gap-3 pt-4 border-t border-border/60 px-2 mt-auto">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted font-bold text-xs text-foreground uppercase border border-border">
            {user.name ? user.name.slice(0, 2) : 'AD'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-foreground truncate">{user.name}</span>
            <span className="text-[11px] text-muted-foreground truncate">{user.email}</span>
          </div>
        </div>
      )}
    </aside>
  );
};
