import type { ReactNode } from 'react';

export interface PricingFeature {
  label: string;
  included?: boolean;
}

export interface PricingPlan {
  name: string;
  description?: string;
  price: string;
  period?: string;
  badge?: string;
  featured?: boolean;
  features: PricingFeature[];
  actionLabel: string;
  actionHref: string;
  note?: string;
}

export interface PricingSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  plans: PricingPlan[];
  className?: string;
  footerNote?: ReactNode;
}
