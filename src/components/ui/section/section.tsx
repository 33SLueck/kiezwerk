import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import type { SectionProps } from './section.types';
import { getSectionClasses } from './section.styles';

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  as = 'section',
  spacing = 'md',
  tone = 'default',
}) => {
  const Comp = as;

  return <Comp className={cn(getSectionClasses(spacing, tone), className)}>{children}</Comp>;
};
