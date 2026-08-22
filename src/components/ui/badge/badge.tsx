import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import type { BadgeProps } from './badge.types';
import { badgeVariants } from './badge.styles';

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'sm',
}) => {
  return <span className={cn(badgeVariants({ variant, size }), className)}>{children}</span>;
};
