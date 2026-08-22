const baseClasses = 'w-full bg-muted/30';
const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';
const spacingClasses = 'py-16 md:py-24';
const cardClasses = 'rounded-3xl border border-border bg-card p-8 shadow-sm md:p-12';
const contentClasses = 'mx-auto flex max-w-3xl flex-col gap-5 text-center';
const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';
const titleClasses = 'text-3xl font-semibold tracking-tight text-foreground md:text-4xl';
const descriptionClasses = 'text-base text-muted-foreground md:text-lg';
const actionsClasses = 'flex flex-wrap items-center justify-center gap-3 pt-2';
const noteClasses = 'text-sm text-muted-foreground';
const footerClasses = 'pt-4 text-sm text-muted-foreground';

export const getFooterTeaserSectionClasses = (className?: string) =>
  [baseClasses, className].filter(Boolean).join(' ');
export const getFooterTeaserSectionInnerClasses = () =>
  [innerClasses, spacingClasses].filter(Boolean).join(' ');
export const getFooterTeaserSectionCardClasses = () => [cardClasses].filter(Boolean).join(' ');
export const getFooterTeaserSectionContentClasses = () =>
  [contentClasses].filter(Boolean).join(' ');
export const getFooterTeaserSectionEyebrowClasses = () =>
  [eyebrowClasses].filter(Boolean).join(' ');
export const getFooterTeaserSectionTitleClasses = () => [titleClasses].filter(Boolean).join(' ');
export const getFooterTeaserSectionDescriptionClasses = () =>
  [descriptionClasses].filter(Boolean).join(' ');
export const getFooterTeaserSectionActionsClasses = () =>
  [actionsClasses].filter(Boolean).join(' ');
export const getFooterTeaserSectionNoteClasses = () => [noteClasses].filter(Boolean).join(' ');
export const getFooterTeaserSectionFooterClasses = () => [footerClasses].filter(Boolean).join(' ');
