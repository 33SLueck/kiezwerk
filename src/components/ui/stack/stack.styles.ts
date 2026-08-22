import type { StackAlign, StackDirection, StackGap, StackJustify } from './stack.types';

const baseStackClasses = 'flex';

const directionClasses: Record<StackDirection, string> = {
  vertical: 'flex-col',
  horizontal: 'flex-row',
};

const gapClasses: Record<StackGap, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

const alignClasses: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClasses: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export const getStackClasses = (
  direction: StackDirection = 'vertical',
  gap: StackGap = 'md',
  align: StackAlign = 'stretch',
  justify: StackJustify = 'start',
  wrap = false
) => {
  return [
    baseStackClasses,
    directionClasses[direction],
    gapClasses[gap],
    alignClasses[align],
    justifyClasses[justify],
    wrap ? 'flex-wrap' : 'flex-nowrap',
  ]
    .filter(Boolean)
    .join(' ');
};
