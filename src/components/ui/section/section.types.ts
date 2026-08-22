import * as React from 'react';

export type SectionElement = 'section' | 'header' | 'footer' | 'aside' | 'main' | 'div';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg';

export type SectionTone = 'default' | 'muted';

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  as?: SectionElement;
  spacing?: SectionSpacing;
  tone?: SectionTone;
}
