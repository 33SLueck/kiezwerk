import type { CtaSectionTone } from './cta-section.types';

const baseCtaSectionClasses = 'w-full';

const toneClasses: Record<CtaSectionTone, string> = {
  default: 'bg-primary text-primary-foreground',
  muted: 'bg-muted/30 text-foreground',
};

const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const spacingClasses = 'py-16 md:py-24';

const cardClasses = 'overflow-hidden rounded-3xl border border-border/60 shadow-sm';

const contentGridClasses =
  'grid gap-10 p-8 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] md:p-12';

const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';

const titleClasses = 'text-3xl font-semibold tracking-tight md:text-4xl';

const descriptionClasses = 'text-base text-muted-foreground md:text-lg';

const actionsClasses = 'flex flex-wrap items-center gap-3';

const noteClasses = 'text-sm text-muted-foreground';

const visualWrapClasses = 'flex items-center justify-center';

export const getCtaSectionClasses = (tone: CtaSectionTone = 'default', className?: string) => {
  return [baseCtaSectionClasses, toneClasses[tone], className].filter(Boolean).join(' ');
};

export const getCtaSectionInnerClasses = () => {
  return [innerClasses, spacingClasses].filter(Boolean).join(' ');
};

export const getCtaSectionCardClasses = () => {
  return [cardClasses].filter(Boolean).join(' ');
};

export const getCtaSectionContentGridClasses = () => {
  return [contentGridClasses].filter(Boolean).join(' ');
};

export const getCtaSectionEyebrowClasses = () => {
  return [eyebrowClasses].filter(Boolean).join(' ');
};

export const getCtaSectionTitleClasses = () => {
  return [titleClasses].filter(Boolean).join(' ');
};

export const getCtaSectionDescriptionClasses = () => {
  return [descriptionClasses].filter(Boolean).join(' ');
};

export const getCtaSectionActionsClasses = () => {
  return [actionsClasses].filter(Boolean).join(' ');
};

export const getCtaSectionNoteClasses = () => {
  return [noteClasses].filter(Boolean).join(' ');
};

export const getCtaSectionVisualWrapClasses = () => {
  return [visualWrapClasses].filter(Boolean).join(' ');
};
