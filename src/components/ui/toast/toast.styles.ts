import { cva } from 'class-variance-authority';

export const toastVariants = cva(
  [
    'fixed bottom-4 right-4 z-50 flex items-center justify-between gap-3 w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out',
  ],
  {
    variants: {
      variant: {
        success:
          'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-900 dark:text-green-200',
        error:
          'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-900 dark:text-red-200',
        info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-900 dark:text-blue-200',
      },
      isOpen: {
        true: 'translate-y-0 opacity-100 scale-100',
        false: 'translate-y-2 opacity-0 scale-95 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'info',
      isOpen: false,
    },
  }
);
