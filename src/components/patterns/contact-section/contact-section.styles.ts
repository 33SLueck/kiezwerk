export const getContactSectionClasses = (className?: string) => {
  return ['w-full bg-background py-20 sm:py-24', className].filter(Boolean).join(' ');
};

export const getContactSectionInnerClasses = () => {
  return 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-12 lg:grid-cols-2';
};
