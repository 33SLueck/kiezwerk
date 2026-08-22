import type { ReactNode } from 'react';

export type SplitSectionDirection = 'text-left' | 'text-right';

export type SplitSectionTone = 'default' | 'muted';

export interface SplitSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  content: ReactNode;
  visual?: ReactNode;
  direction?: SplitSectionDirection;
  tone?: SplitSectionTone;
  className?: string;
}
