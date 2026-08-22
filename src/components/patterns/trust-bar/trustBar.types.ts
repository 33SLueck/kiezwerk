import type { ReactNode } from 'react';

export type TrustBarVariant = 'logos' | 'stats';

export interface TrustBarItem {
  label: string;
  icon?: ReactNode;
}

export interface TrustBarProps {
  title?: string;
  items: TrustBarItem[];
  variant?: TrustBarVariant;
  className?: string;
}
