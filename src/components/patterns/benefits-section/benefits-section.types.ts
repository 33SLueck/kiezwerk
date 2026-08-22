import type { ReactNode } from 'react';

export interface BenefitsSectionItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface BenefitsSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: BenefitsSectionItem[];
  className?: string;
}
