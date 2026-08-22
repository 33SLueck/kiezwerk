import type { ReactNode } from 'react';

export type FeatureOverviewColumns = 2 | 3 | 4;

export interface FeatureOverviewItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeatureOverviewProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FeatureOverviewItem[];
  columns?: FeatureOverviewColumns;
  className?: string;
}
