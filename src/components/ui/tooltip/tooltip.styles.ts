import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  [
    'absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200',
    'px-2 py-1 text-xs font-medium text-background bg-foreground rounded shadow-sm whitespace-nowrap',
  ],
  {
    variants: {
      position: {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      },
    },
    defaultVariants: {
      position: 'top',
    },
  }
);
