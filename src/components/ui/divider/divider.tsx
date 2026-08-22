import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import type { DividerProps } from './divider.types';
import { getDividerClasses } from './divider.styles';

export const Divider: React.FC<DividerProps> = ({
  className,
  as = 'hr',
  orientation = 'horizontal',
  tone = 'default',
  decorative = true,
}) => {
  const Comp = as;

  return (
    <Comp
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={orientation}
      aria-hidden={decorative ? true : undefined}
      className={cn(getDividerClasses(orientation, tone), className)}
    />
  );
};
