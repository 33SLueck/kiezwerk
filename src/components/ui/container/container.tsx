import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils/cn'; // falls ihr eine className-Helper-Funktion habt
import type { ContainerProps } from './container.types';
import { getContainerClasses } from './container.styles';

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'md',
  border = 'none',
  asChild = false,
}) => {
  const Comp = asChild ? Slot : 'div';

  return <Comp className={cn(getContainerClasses(size, border), className)}>{children}</Comp>;
};
