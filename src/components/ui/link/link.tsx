import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import NextLink from 'next/link';
import { cn } from '@/lib/utils/cn';
import { linkVariants } from './link.styles';
import type { LinkProps } from './link.types';

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      asChild = false,
      external = false,
      variant = 'default',
      className,
      children,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const isInternal =
      !external &&
      href &&
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:');
    const Component = asChild ? Slot : isInternal ? NextLink : 'a';
    const externalProps = external
      ? {
          target: '_blank',
          rel: 'noreferrer noopener',
        }
      : {
          target,
          rel,
        };

    return (
      <Component
        ref={ref}
        href={href ?? '#'}
        className={cn(linkVariants({ variant }), className)}
        {...externalProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Link.displayName = 'Link';
