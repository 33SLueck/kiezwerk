export const getProgressContainerClasses = (className?: string) => {
  return ['relative w-full h-4 overflow-hidden rounded-full bg-muted', className]
    .filter(Boolean)
    .join(' ');
};

export const getProgressBarClasses = () => {
  return 'h-full w-full flex-1 bg-foreground transition-all duration-300 ease-in-out';
};
