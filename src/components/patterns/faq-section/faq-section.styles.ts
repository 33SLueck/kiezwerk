const baseFaqSectionClasses = 'w-full bg-background';

const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const spacingClasses = 'py-16 md:py-24';

const headerClasses = 'mx-auto flex max-w-3xl flex-col gap-4';

const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';

const titleClasses = 'text-3xl font-semibold tracking-tight text-foreground md:text-4xl';

const descriptionClasses = 'text-base text-muted-foreground md:text-lg';

const listClasses = 'mt-10 divide-y divide-border rounded-2xl border border-border bg-card';

const itemClasses = '';

const buttonClasses =
  'flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset cursor-pointer';

const questionClasses = 'text-base md:text-lg';

const answerClasses = 'px-6 pb-5 text-sm leading-6 text-muted-foreground md:text-base';

const iconWrapClasses =
  'inline-flex size-10 shrink-0 items-center justify-center text-muted-foreground';

const iconClasses = 'size-5 transition-transform duration-200';

export const getFaqSectionClasses = (className?: string) => {
  return [baseFaqSectionClasses, className].filter(Boolean).join(' ');
};

export const getFaqSectionInnerClasses = () => {
  return [innerClasses, spacingClasses].filter(Boolean).join(' ');
};

export const getFaqSectionHeaderClasses = () => {
  return [headerClasses].filter(Boolean).join(' ');
};

export const getFaqSectionEyebrowClasses = () => {
  return [eyebrowClasses].filter(Boolean).join(' ');
};

export const getFaqSectionTitleClasses = () => {
  return [titleClasses].filter(Boolean).join(' ');
};

export const getFaqSectionDescriptionClasses = () => {
  return [descriptionClasses].filter(Boolean).join(' ');
};

export const getFaqSectionListClasses = () => {
  return [listClasses].filter(Boolean).join(' ');
};

export const getFaqSectionItemClasses = () => {
  return [itemClasses].filter(Boolean).join(' ');
};

export const getFaqSectionButtonClasses = () => {
  return [buttonClasses].filter(Boolean).join(' ');
};

export const getFaqSectionQuestionClasses = () => {
  return [questionClasses].filter(Boolean).join(' ');
};

export const getFaqSectionAnswerClasses = () => {
  return [answerClasses].filter(Boolean).join(' ');
};

export const getFaqSectionIconWrapClasses = () => {
  return [iconWrapClasses].filter(Boolean).join(' ');
};

export const getFaqSectionIconClasses = () => {
  return [iconClasses].filter(Boolean).join(' ');
};
