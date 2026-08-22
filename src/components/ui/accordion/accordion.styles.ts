import { cva } from 'class-variance-authority';

export const accordionContainerVariants = cva('divide-y divide-border border-y border-border');

export const accordionItemVariants = cva('py-2');

export const accordionTriggerVariants = cva(
  'flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      isExpanded: {
        true: 'text-foreground',
        false: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      isExpanded: false,
    },
  }
);

export const accordionContentVariants = cva('grid transition-all duration-200 ease-in-out', {
  variants: {
    isExpanded: {
      true: 'grid-rows-[1fr] opacity-100 py-2',
      false: 'grid-rows-[0fr] opacity-0 py-0',
    },
  },
  defaultVariants: {
    isExpanded: false,
  },
});
