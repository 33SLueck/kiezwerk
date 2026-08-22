import { cva } from 'class-variance-authority';

export const drawerVariants = cva(
  'fixed z-50 bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out border-border outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm',
  {
    variants: {
      side: {
        top: 'm-0 mb-auto inset-x-0 top-0 border-b w-full max-w-none',
        bottom: 'm-0 mt-auto inset-x-0 bottom-0 border-t w-full max-w-none',
        left: 'm-0 mr-auto inset-y-0 left-0 h-full w-3/4 max-w-sm border-r max-h-none',
        right: 'm-0 ml-auto inset-y-0 right-0 h-full w-3/4 max-w-sm border-l max-h-none',
      },
      isOpen: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { side: 'top', isOpen: true, className: 'translate-y-0' },
      { side: 'top', isOpen: false, className: '-translate-y-full' },
      { side: 'bottom', isOpen: true, className: 'translate-y-0' },
      { side: 'bottom', isOpen: false, className: 'translate-y-full' },
      { side: 'left', isOpen: true, className: 'translate-x-0' },
      { side: 'left', isOpen: false, className: '-translate-x-full' },
      { side: 'right', isOpen: true, className: 'translate-x-0' },
      { side: 'right', isOpen: false, className: 'translate-x-full' },
    ],
    defaultVariants: {
      side: 'right',
      isOpen: false,
    },
  }
);
