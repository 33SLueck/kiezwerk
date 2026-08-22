export const getHeaderClasses = (className?: string) => {
  return ['w-full border-b border-border bg-background sticky top-0 z-40', className]
    .filter(Boolean)
    .join(' ');
};

export const getHeaderInnerClasses = () => {
  return 'mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8';
};

export const getNavListClasses = () => {
  return 'hidden md:flex items-center space-x-6';
};

export const getNavLinkClasses = () => {
  return 'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150';
};
