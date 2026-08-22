export const getModalContainerClasses = (isOpen: boolean, className?: string) => {
  return [
    'm-auto w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm transition-all duration-300',
    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    className,
  ]
    .filter(Boolean)
    .join(' ');
};

export const getModalHeaderClasses = () => {
  return 'flex items-center justify-between pb-4 border-b border-border';
};

export const getModalTitleClasses = () => {
  return 'text-lg font-semibold text-foreground';
};

export const getModalCloseButtonClasses = () => {
  return 'rounded-sm opacity-70 hover:opacity-100 focus:outline-none transition-opacity text-foreground';
};

export const getModalContentClasses = () => {
  return 'py-6 text-sm text-muted-foreground';
};

export const getModalFooterClasses = () => {
  return 'flex justify-end gap-2 pt-4 border-t border-border';
};
