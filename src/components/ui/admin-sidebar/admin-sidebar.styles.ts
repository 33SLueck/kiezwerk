import { cva } from 'class-variance-authority';

export const adminSidebarVariants = cva(
  'flex flex-col justify-between w-64 border-r border-border bg-card p-4 transition-all',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        dark: 'bg-muted/20 text-card-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
