import type React from 'react';

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild?: boolean;
  external?: boolean;
  variant?: 'default' | 'muted';
};
