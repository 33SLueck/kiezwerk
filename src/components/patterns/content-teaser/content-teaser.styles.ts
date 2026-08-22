export const getTeaserSectionClasses = (className?: string) => {
  return ['w-full bg-background py-20 sm:py-24', className].filter(Boolean).join(' ');
};

export const getTeaserInnerClasses = () => {
  return 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
};

export const getTeaserGridClasses = () => {
  return 'mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3';
};
