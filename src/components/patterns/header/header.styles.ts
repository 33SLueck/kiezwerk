export const getHeaderClasses = (className?: string) => {
  return ['w-full border-b border-border bg-background sticky top-0 z-40', className]
    .filter(Boolean)
    .join(' ');
};

export const getHeaderInnerClasses = () => {
  return 'mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8';
};

export const getNavListClasses = () => {
  return 'hidden min-w-0 lg:flex lg:items-center lg:space-x-6';
};

export const getNavLinkClasses = () => {
  return 'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 whitespace-nowrap';
};

export const getDesktopActionsClasses = () => {
  return 'hidden shrink-0 lg:flex lg:items-center lg:gap-4';
};

export const getMobileMenuButtonClasses = () => {
  return 'shrink-0 lg:hidden';
};
