import type { ReactNode } from 'react';

export type CtaSectionTone = 'default' | 'muted';

export interface CtaSectionAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface CtaSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction: CtaSectionAction;
  secondaryAction?: CtaSectionAction;
  note?: string;
  visual?: ReactNode;
  tone?: CtaSectionTone;
  className?: string;
}
