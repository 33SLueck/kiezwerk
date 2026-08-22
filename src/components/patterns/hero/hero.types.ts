import type { ReactNode } from 'react';

export type HeroAlignment = 'left' | 'center';

export type HeroTone = 'default' | 'muted';

export type HeroSize = 'sm' | 'md' | 'lg';

export type HeroAction = {
  label: string;
  href: string;
  external?: boolean;
};

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  visual?: ReactNode;
  alignment?: HeroAlignment;
  tone?: HeroTone;
  size?: HeroSize;
  className?: string;
}
