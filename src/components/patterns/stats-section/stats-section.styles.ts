export const getStatsSectionClasses = (className?: string) => {
  return ['w-full bg-background py-20 sm:py-24 border-y border-border', className]
    .filter(Boolean)
    .join(' ');
};

export const getStatsSectionInnerClasses = () => {
  return 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
};

export const getStatsSectionGridClasses = () => {
  return 'grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4';
};
