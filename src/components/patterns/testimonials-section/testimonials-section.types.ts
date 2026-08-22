import type { ReactNode } from 'react';

export interface TestimonialsSectionItem {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: ReactNode;
  rating?: number;
}

export interface TestimonialsSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: TestimonialsSectionItem[];
  columns?: 2 | 3;
  className?: string;
}
