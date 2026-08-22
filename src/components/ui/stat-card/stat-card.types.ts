import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { statCardVariants } from './stat-card.styles';

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  icon?: React.ReactNode;
}
