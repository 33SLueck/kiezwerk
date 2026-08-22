import type { SplitSectionDirection, SplitSectionTone } from './split-section.types';

const baseSplitSectionClasses = 'w-full bg-background';

const toneClasses: Record<SplitSectionTone, string> = {
  default: 'bg-background text-foreground',
  muted: 'bg-muted/20 text-foreground',
};

const spacingClasses = 'py-16 md:py-24';

const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const gridClasses = 'grid gap-10 items-center lg:grid-cols-2 lg:gap-16';

const reverseClasses: Record<SplitSectionDirection, string> = {
  'text-left': '',
  'text-right': 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1',
};

const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';

const titleClasses = 'text-3xl font-semibold tracking-tight text-foreground md:text-4xl';

const descriptionClasses = 'text-base text-muted-foreground md:text-lg';

const textColClasses = 'flex flex-col gap-6';

const visualColClasses = 'w-full';

const contentWrapClasses = 'flex flex-col gap-6';

export const getSplitSectionClasses = (tone: SplitSectionTone = 'default', className?: string) => {
  return [baseSplitSectionClasses, toneClasses[tone], className].filter(Boolean).join(' ');
};

export const getSplitSectionInnerClasses = () => {
  return [innerClasses, spacingClasses].filter(Boolean).join(' ');
};

export const getSplitSectionGridClasses = (direction: SplitSectionDirection = 'text-left') => {
  return [gridClasses, reverseClasses[direction]].filter(Boolean).join(' ');
};

export const getSplitSectionEyebrowClasses = () => {
  return [eyebrowClasses].filter(Boolean).join(' ');
};

export const getSplitSectionTitleClasses = () => {
  return [titleClasses].filter(Boolean).join(' ');
};

export const getSplitSectionDescriptionClasses = () => {
  return [descriptionClasses].filter(Boolean).join(' ');
};

export const getSplitSectionTextColClasses = () => {
  return [textColClasses].filter(Boolean).join(' ');
};

export const getSplitSectionVisualColClasses = () => {
  return [visualColClasses].filter(Boolean).join(' ');
};

export const getSplitSectionContentWrapClasses = () => {
  return [contentWrapClasses].filter(Boolean).join(' ');
};
