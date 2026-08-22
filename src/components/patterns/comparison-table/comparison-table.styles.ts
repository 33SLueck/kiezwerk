export const getComparisonTableClasses = (className?: string) => {
  return ['w-full bg-background py-20 sm:py-24', className].filter(Boolean).join(' ');
};

export const getComparisonTableInnerClasses = () => {
  return 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
};

export const getTableWrapperClasses = () => {
  return 'mt-12 overflow-x-auto border border-border rounded-lg';
};

export const getTableClasses = () => {
  return 'min-w-full divide-y divide-border text-sm';
};

export const getThClasses = () => {
  return 'px-6 py-4 text-left font-semibold text-foreground bg-muted/20';
};

export const getTdClasses = () => {
  return 'px-6 py-4 text-foreground border-t border-border';
};
