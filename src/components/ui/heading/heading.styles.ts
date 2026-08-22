import { cva } from 'class-variance-authority';

export const headingVariants = cva('font-semibold tracking-tight text-foreground', {
  variants: {
    size: {
      sm: 'text-lg md:text-xl',
      md: 'text-xl md:text-2xl',
      lg: 'text-2xl md:text-3xl',
      xl: 'text-3xl md:text-4xl',
      '2xl': 'text-4xl md:text-5xl',
      '3xl': 'text-5xl md:text-6xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
