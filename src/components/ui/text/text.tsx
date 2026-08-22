import { cn } from '@/lib/utils/cn';
import { textVariants } from './text.styles';
import type { TextProps } from './text.types';

export const Text = <E extends 'p' | 'span' = 'p'>({
  as,
  size = 'md',
  variant = 'default',
  className,
  children,
  ...props
}: TextProps<E>) => {
  const Component = as ?? 'p';
  const classes = textVariants({ size, variant });

  return (
    <Component className={cn(classes, className)} {...props}>
      {children}
    </Component>
  );
};
