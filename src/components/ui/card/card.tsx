import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import type { CardProps } from './card.types';
import { getCardClasses } from './card.styles';

export const Card: React.FC<CardProps> = ({
  children,
  className,
  as = 'div',
  variant = 'default',
  padding = 'md',
}) => {
  const Comp = as;

  return <Comp className={cn(getCardClasses(variant, padding), className)}>{children}</Comp>;
};
