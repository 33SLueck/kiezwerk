import { cva } from 'class-variance-authority';

export const selectVariants = cva(
  'peer flex h-11 w-full rounded-xl border bg-card pl-4 pr-10 py-2 text-sm text-card-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60 appearance-none',
  {
    variants: {
      variant: {
        default:
          'border-border focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20',
      },
      error: {
        true: 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: false,
    },
  }
);

export const selectLabelWrapClasses = 'flex flex-col gap-1.5 relative w-full';
export const selectLabelClasses = 'text-sm font-medium leading-5 text-foreground';

export const selectHelperTextVariants = cva('text-xs leading-4 text-muted-foreground', {
  variants: {
    error: {
      true: 'text-destructive',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});
