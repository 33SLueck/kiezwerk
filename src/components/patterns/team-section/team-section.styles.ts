export const getTeamSectionClasses = (className?: string) => {
  return ['w-full bg-background py-20 sm:py-24', className].filter(Boolean).join(' ');
};

export const getTeamSectionInnerClasses = () => {
  return 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
};

export const getTeamGridClasses = () => {
  return 'mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3';
};
