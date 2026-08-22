import type { ReactNode } from 'react';

export interface FaqSectionItem {
  question: string;
  answer: ReactNode;
}

export interface FaqSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FaqSectionItem[];
  defaultOpenIndex?: number | null;
  className?: string;
}
