const basePricingSectionClasses = 'w-full bg-background';
const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';
const spacingClasses = 'py-16 md:py-24';
const headerClasses = 'mx-auto flex max-w-3xl flex-col gap-4';
const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';
const titleClasses = 'text-3xl font-semibold tracking-tight text-foreground md:text-4xl';
const descriptionClasses = 'text-base text-muted-foreground md:text-lg';
const gridClasses = 'mt-10 grid gap-6 lg:grid-cols-3';
const cardBaseClasses =
  'flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-sm';
const featuredClasses = 'border-primary/40 ring-1 ring-primary/20';
const badgeClasses =
  'inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary';
const nameClasses = 'text-lg font-semibold text-foreground';
const priceWrapClasses = 'mt-4 flex items-end gap-2';
const priceClasses = 'text-4xl font-semibold tracking-tight text-foreground';
const periodClasses = 'pb-1 text-sm text-muted-foreground';
const planDescriptionClasses = 'mt-3 text-sm leading-6 text-muted-foreground';
const featureListClasses = 'mt-6 flex-1 space-y-3';
const featureItemClasses = 'flex items-start gap-3 text-sm';
const featureIconBaseClasses = 'mt-0.5 h-4 w-4 shrink-0';
const includedClasses = 'text-foreground';
const excludedClasses = 'text-muted-foreground';
const actionWrapClasses = 'mt-6';
const noteClasses = 'mt-3 text-sm text-muted-foreground';
const footerNoteClasses = 'mt-8 text-sm text-muted-foreground';

export const getPricingSectionClasses = (className?: string) =>
  [basePricingSectionClasses, className].filter(Boolean).join(' ');
export const getPricingSectionInnerClasses = () =>
  [innerClasses, spacingClasses].filter(Boolean).join(' ');
export const getPricingSectionHeaderClasses = () => [headerClasses].filter(Boolean).join(' ');
export const getPricingSectionEyebrowClasses = () => [eyebrowClasses].filter(Boolean).join(' ');
export const getPricingSectionTitleClasses = () => [titleClasses].filter(Boolean).join(' ');
export const getPricingSectionDescriptionClasses = () =>
  [descriptionClasses].filter(Boolean).join(' ');
export const getPricingSectionGridClasses = () => [gridClasses].filter(Boolean).join(' ');
export const getPricingSectionCardClasses = (featured?: boolean) =>
  [cardBaseClasses, featured ? featuredClasses : null].filter(Boolean).join(' ');
export const getPricingSectionBadgeClasses = () => [badgeClasses].filter(Boolean).join(' ');
export const getPricingSectionNameClasses = () => [nameClasses].filter(Boolean).join(' ');
export const getPricingSectionPriceWrapClasses = () => [priceWrapClasses].filter(Boolean).join(' ');
export const getPricingSectionPriceClasses = () => [priceClasses].filter(Boolean).join(' ');
export const getPricingSectionPeriodClasses = () => [periodClasses].filter(Boolean).join(' ');
export const getPricingSectionPlanDescriptionClasses = () =>
  [planDescriptionClasses].filter(Boolean).join(' ');
export const getPricingSectionFeatureListClasses = () =>
  [featureListClasses].filter(Boolean).join(' ');
export const getPricingSectionFeatureItemClasses = () =>
  [featureItemClasses].filter(Boolean).join(' ');
export const getPricingSectionFeatureIconBaseClasses = () =>
  [featureIconBaseClasses].filter(Boolean).join(' ');
export const getPricingSectionIncludedClasses = () => [includedClasses].filter(Boolean).join(' ');
export const getPricingSectionExcludedClasses = () => [excludedClasses].filter(Boolean).join(' ');
export const getPricingSectionActionWrapClasses = () =>
  [actionWrapClasses].filter(Boolean).join(' ');
export const getPricingSectionNoteClasses = () => [noteClasses].filter(Boolean).join(' ');
export const getPricingSectionFooterNoteClasses = () =>
  [footerNoteClasses].filter(Boolean).join(' ');
