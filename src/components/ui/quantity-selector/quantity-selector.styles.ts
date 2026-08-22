import { cva } from 'class-variance-authority';

export const quantityContainerVariants = cva(
  'inline-flex items-center rounded-lg border border-border bg-background p-1 shadow-sm',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        md: 'h-9 text-sm',
        lg: 'h-10 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const quantityButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'w-7 h-7 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-9 h-9 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
