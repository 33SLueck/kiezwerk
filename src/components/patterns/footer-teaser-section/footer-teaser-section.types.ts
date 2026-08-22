import type { ReactNode } from 'react';

export interface FooterTeaserSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryActionLabel: string;
  primaryActionHref: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  note?: string;
  footer?: ReactNode;
  className?: string;
}
