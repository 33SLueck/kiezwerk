import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import type { StackProps } from './stack.types';
import { getStackClasses } from './stack.styles';

export const Stack: React.FC<StackProps> = ({
  children,
  className,
  as = 'div',
  direction = 'vertical',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
}) => {
  const Comp = as;

  return (
    <Comp className={cn(getStackClasses(direction, gap, align, justify, wrap), className)}>
      {children}
    </Comp>
  );
};
