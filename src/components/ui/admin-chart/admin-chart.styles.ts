import { cva } from 'class-variance-authority';

export const adminChartVariants = cva(
  'rounded-xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between space-y-4',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        bordered: 'bg-background border-2 border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
