const baseTestimonialsSectionClasses = 'w-full bg-background';

const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const spacingClasses = 'py-16 md:py-24';

const headerClasses = 'mx-auto flex max-w-3xl flex-col gap-4';

const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';

const titleClasses = 'text-3xl font-semibold tracking-tight text-foreground md:text-4xl';

const descriptionClasses = 'text-base text-muted-foreground md:text-lg';

const gridClasses: Record<2 | 3, string> = {
  2: 'mt-10 grid gap-6 md:grid-cols-2',
  3: 'mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3',
};

const cardClasses =
  'flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm';

const quoteClasses = 'text-sm leading-6 text-foreground md:text-base';

const footerClasses = 'mt-auto flex items-center gap-3 pt-2';

const avatarClasses =
  'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-foreground';

const metaClasses = 'flex flex-col';

const nameClasses = 'text-sm font-semibold text-foreground';

const roleClasses = 'text-sm text-muted-foreground';

const ratingClasses = 'flex items-center gap-1 text-amber-500';

export const getTestimonialsSectionClasses = (className?: string) => {
  return [baseTestimonialsSectionClasses, className].filter(Boolean).join(' ');
};

export const getTestimonialsSectionInnerClasses = () => {
  return [innerClasses, spacingClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionHeaderClasses = () => {
  return [headerClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionEyebrowClasses = () => {
  return [eyebrowClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionTitleClasses = () => {
  return [titleClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionDescriptionClasses = () => {
  return [descriptionClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionGridClasses = (columns: 2 | 3 = 3) => {
  return [gridClasses[columns]].filter(Boolean).join(' ');
};

export const getTestimonialsSectionCardClasses = () => {
  return [cardClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionQuoteClasses = () => {
  return [quoteClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionFooterClasses = () => {
  return [footerClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionAvatarClasses = () => {
  return [avatarClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionMetaClasses = () => {
  return [metaClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionNameClasses = () => {
  return [nameClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionRoleClasses = () => {
  return [roleClasses].filter(Boolean).join(' ');
};

export const getTestimonialsSectionRatingClasses = () => {
  return [ratingClasses].filter(Boolean).join(' ');
};
