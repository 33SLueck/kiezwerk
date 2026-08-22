export const getTabsContainerClasses = (className?: string) => {
  return ['w-full', className].filter(Boolean).join(' ');
};

export const getTabsListClasses = () => {
  return 'flex border-b border-border space-x-4';
};

export const getTabButtonClasses = (isActive: boolean) => {
  return [
    'px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150 focus:outline-none',
    isActive
      ? 'border-foreground text-foreground'
      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground',
  ].join(' ');
};

export const getTabPanelClasses = () => {
  return 'py-4 text-sm text-foreground';
};
