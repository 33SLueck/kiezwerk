import { cva } from 'class-variance-authority';

export const checkboxContainerVariants = cva(
  'inline-flex items-start gap-3 rounded-xl cursor-pointer select-none',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-60 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const checkboxControlVariants = cva(
  [
    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-150',
    'border-border bg-card text-card-foreground',
    'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
    'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground',
  ],
  {
    variants: {
      variant: {
        default: '',
      },
      error: {
        true: 'border-destructive peer-checked:border-destructive peer-checked:bg-destructive',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: false,
    },
  }
);

export const checkboxLabelWrapClasses = 'flex flex-col gap-1';
export const checkboxLabelClasses = 'text-sm leading-5 text-foreground';

export const checkboxHelperTextVariants = cva('text-xs leading-4 text-muted-foreground', {
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
