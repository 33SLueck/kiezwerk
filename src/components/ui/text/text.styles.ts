import { cva } from 'class-variance-authority';

export const textVariants = cva('text-foreground leading-relaxed', {
  variants: {
    size: {
      sm: 'text-sm md:text-base',
      md: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl',
      xl: 'text-xl md:text-2xl',
      '2xl': 'text-2xl md:text-3xl',
      '3xl': 'text-3xl md:text-4xl',
    },
    variant: {
      default: '',
      muted: 'text-muted-foreground',
      highlight: 'font-semibold',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});
