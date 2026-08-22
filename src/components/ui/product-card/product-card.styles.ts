import { cva } from 'class-variance-authority';

export const productCardVariants = cva(
  'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80'
);
