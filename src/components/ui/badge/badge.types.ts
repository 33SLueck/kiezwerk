import * as React from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}
