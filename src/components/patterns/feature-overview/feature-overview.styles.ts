import type { FeatureOverviewColumns } from './feature-overview.types';

const baseFeatureOverviewClasses = 'w-full bg-background';

const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const spacingClasses = 'py-16 md:py-24';

const headerClasses = 'mx-auto flex max-w-3xl flex-col gap-4';

const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';

const titleClasses = 'text-3xl font-semibold tracking-tight text-foreground md:text-4xl';

const descriptionClasses = 'text-base text-muted-foreground md:text-lg';

const gridClasses: Record<FeatureOverviewColumns, string> = {
  2: 'grid gap-6 md:grid-cols-2',
  3: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid gap-6 md:grid-cols-2 xl:grid-cols-4',
};

const cardClasses =
  'flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-muted/30';

const iconWrapClasses =
  'inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary';

const cardTitleClasses = 'text-lg font-semibold text-foreground';

const cardDescriptionClasses = 'text-sm leading-6 text-muted-foreground';

export const getFeatureOverviewClasses = (className?: string) => {
  return [baseFeatureOverviewClasses, className].filter(Boolean).join(' ');
};

export const getFeatureOverviewInnerClasses = () => {
  return [innerClasses, spacingClasses].filter(Boolean).join(' ');
};

export const getFeatureOverviewHeaderClasses = () => {
  return [headerClasses].filter(Boolean).join(' ');
};

export const getFeatureOverviewEyebrowClasses = () => {
  return [eyebrowClasses].filter(Boolean).join(' ');
};

export const getFeatureOverviewTitleClasses = () => {
  return [titleClasses].filter(Boolean).join(' ');
};

export const getFeatureOverviewDescriptionClasses = () => {
  return [descriptionClasses].filter(Boolean).join(' ');
};

export const getFeatureOverviewGridClasses = (columns: FeatureOverviewColumns = 3) => {
  return [gridClasses[columns]].filter(Boolean).join(' ');
};

export const getFeatureOverviewCardClasses = () => {
  return [cardClasses].filter(Boolean).join(' ');
};

export const getFeatureOverviewIconWrapClasses = () => {
  return [iconWrapClasses].filter(Boolean).join(' ');
};

export const getFeatureOverviewCardTitleClasses = () => {
  return [cardTitleClasses].filter(Boolean).join(' ');
};

export const getFeatureOverviewCardDescriptionClasses = () => {
  return [cardDescriptionClasses].filter(Boolean).join(' ');
};
