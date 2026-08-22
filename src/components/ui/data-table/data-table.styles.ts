import { cva } from 'class-variance-authority';

export const dataTableVariants = cva(
  'rounded-xl border border-border bg-card shadow-xs overflow-hidden flex flex-col',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        compact: 'text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
