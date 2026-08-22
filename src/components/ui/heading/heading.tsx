import { cn } from '@/lib/utils/cn';
import { headingVariants } from './heading.styles';
import type { HeadingProps } from './heading.types';

const levelToTag = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;
export const Heading = ({ level, size = 'md', className, children, ...props }: HeadingProps) => {
  const Component = levelToTag[level];
  const classes = headingVariants({ size });

  return (
    <Component className={cn(classes, className)} {...props}>
      {children}
    </Component>
  );
};
