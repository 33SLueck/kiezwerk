import type { CtaSectionTone } from './cta-section.types';

const baseCtaSectionClasses = 'w-full';

const toneClasses: Record<CtaSectionTone, string> = {
  default: 'bg-cta text-cta-foreground',
  muted: 'bg-muted/30 text-foreground',
};

const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const spacingClasses = 'py-16 md:py-24';

const cardClassesByTone: Record<CtaSectionTone, string> = {
  default: 'overflow-hidden rounded-3xl border border-white/10 shadow-sm',
  muted: 'overflow-hidden rounded-3xl border border-border/60 shadow-sm',
};

const contentGridClasses = 'grid gap-10 p-8 md:p-12';

const contentGridWithVisualClasses =
  'md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]';

const contentGridSingleColumnClasses = 'grid-cols-1';

const eyebrowClassesByTone: Record<CtaSectionTone, string> = {
  default: 'text-sm font-medium uppercase tracking-[0.2em] text-cta-muted',
  muted: 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground',
};

const titleClasses = 'text-3xl font-semibold tracking-tight md:text-4xl';

const descriptionClassesByTone: Record<CtaSectionTone, string> = {
  default: 'text-base text-cta-muted md:text-lg',
  muted: 'text-base text-muted-foreground md:text-lg',
};

const actionsClasses = 'flex flex-wrap items-center gap-3';

const noteClassesByTone: Record<CtaSectionTone, string> = {
  default: 'text-sm text-cta-muted',
  muted: 'text-sm text-muted-foreground',
};

const visualWrapClasses = 'flex items-center justify-center';

const primaryButtonClassesByTone: Record<CtaSectionTone, string | undefined> = {
  default:
    'bg-cta-foreground text-cta hover:bg-cta-foreground/90 hover:opacity-100 focus-visible:ring-cta-foreground',
  muted: undefined,
};

const secondaryButtonClassesByTone: Record<CtaSectionTone, string | undefined> = {
  default:
    'text-cta-foreground hover:bg-cta-foreground/10 hover:text-cta-foreground focus-visible:ring-cta-foreground',
  muted: undefined,
};

export const getCtaSectionClasses = (tone: CtaSectionTone = 'default', className?: string) => {
  return [baseCtaSectionClasses, toneClasses[tone], className].filter(Boolean).join(' ');
};

export const getCtaSectionInnerClasses = () => {
  return [innerClasses, spacingClasses].filter(Boolean).join(' ');
};

export const getCtaSectionCardClasses = (tone: CtaSectionTone = 'default') => {
  return cardClassesByTone[tone];
};

export const getCtaSectionContentGridClasses = (hasVisual = false) => {
  return [
    contentGridClasses,
    hasVisual ? contentGridWithVisualClasses : contentGridSingleColumnClasses,
  ]
    .filter(Boolean)
    .join(' ');
};

export const getCtaSectionEyebrowClasses = (tone: CtaSectionTone = 'default') => {
  return eyebrowClassesByTone[tone];
};

export const getCtaSectionTitleClasses = () => {
  return titleClasses;
};

export const getCtaSectionDescriptionClasses = (tone: CtaSectionTone = 'default') => {
  return descriptionClassesByTone[tone];
};

export const getCtaSectionActionsClasses = () => {
  return actionsClasses;
};

export const getCtaSectionNoteClasses = (tone: CtaSectionTone = 'default') => {
  return noteClassesByTone[tone];
};

export const getCtaSectionVisualWrapClasses = () => {
  return visualWrapClasses;
};

export const getCtaPrimaryButtonClasses = (tone: CtaSectionTone = 'default') => {
  return primaryButtonClassesByTone[tone];
};

export const getCtaSecondaryButtonClasses = (tone: CtaSectionTone = 'default') => {
  return secondaryButtonClassesByTone[tone];
};
