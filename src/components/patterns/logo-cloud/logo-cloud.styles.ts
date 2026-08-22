export const getLogoCloudClasses = (className?: string) => {
  return ['w-full bg-background py-12 sm:py-16', className].filter(Boolean).join(' ');
};

export const getLogoCloudInnerClasses = () => {
  return 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center';
};

export const getLogoCloudTitleClasses = () => {
  return 'text-sm font-semibold leading-8 text-muted-foreground uppercase tracking-wider mb-8';
};

export const getLogoCloudGridClasses = () => {
  return 'mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5';
};

export const getLogoImageClasses = () => {
  return 'col-span-2 max-h-12 w-full object-contain lg:col-span-1 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300';
};
