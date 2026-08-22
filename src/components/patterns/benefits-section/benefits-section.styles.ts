const baseBenefitsSectionClasses = 'w-full bg-muted/20';

const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const spacingClasses = 'py-16 md:py-24';

const headerClasses = 'mx-auto flex max-w-3xl flex-col gap-4';

const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';

const titleClasses = 'text-3xl font-semibold tracking-tight text-foreground md:text-4xl';

const descriptionClasses = 'text-base text-muted-foreground md:text-lg';

const listClasses = 'mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3';

const itemClasses = 'flex gap-4 rounded-2xl border border-border bg-background p-6 shadow-sm';

const iconWrapClasses =
  'mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary';

const itemContentClasses = 'flex flex-col gap-2';

const itemTitleClasses = 'text-lg font-semibold text-foreground';

const itemDescriptionClasses = 'text-sm leading-6 text-muted-foreground';

export const getBenefitsSectionClasses = (className?: string) => {
  return [baseBenefitsSectionClasses, className].filter(Boolean).join(' ');
};

export const getBenefitsSectionInnerClasses = () => {
  return [innerClasses, spacingClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionHeaderClasses = () => {
  return [headerClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionEyebrowClasses = () => {
  return [eyebrowClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionTitleClasses = () => {
  return [titleClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionDescriptionClasses = () => {
  return [descriptionClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionListClasses = () => {
  return [listClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionItemClasses = () => {
  return [itemClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionIconWrapClasses = () => {
  return [iconWrapClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionItemContentClasses = () => {
  return [itemContentClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionItemTitleClasses = () => {
  return [itemTitleClasses].filter(Boolean).join(' ');
};

export const getBenefitsSectionItemDescriptionClasses = () => {
  return [itemDescriptionClasses].filter(Boolean).join(' ');
};
