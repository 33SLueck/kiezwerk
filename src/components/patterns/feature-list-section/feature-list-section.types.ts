import type { ReactNode } from 'react';

export interface FeatureBulletItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface FeatureListSectionProps {
  title?: string;
  subtitle?: string;
  items: FeatureBulletItem[];
  className?: string;
}
