import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import type { GridProps } from './grid.types';
import { getGridClasses } from './grid.styles';

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  as = 'div',
  columns = 1,
  responsiveColumns,
  gap = 'md',
  align = 'stretch',
  justify = 'start',
}) => {
  const Comp = as;

  return (
    <Comp
      className={cn(getGridClasses(columns, gap, align, justify, responsiveColumns), className)}
    >
      {children}
    </Comp>
  );
};
