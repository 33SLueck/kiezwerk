import { cva } from 'class-variance-authority';

export const statCardVariants = cva(
  'rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-border/80 hover:shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        subtle: 'bg-muted/30 text-card-foreground',
        accent: 'bg-primary/5 border-primary/20 text-card-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
