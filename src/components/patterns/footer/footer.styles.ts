export const getFooterClasses = (className?: string) => {
  return ['w-full border-t border-border bg-background py-12 md:py-16', className]
    .filter(Boolean)
    .join(' ');
};

export const getFooterInnerClasses = () => {
  return 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-4';
};

export const getFooterColumnTitleClasses = () => {
  return 'text-sm font-semibold text-foreground tracking-wider uppercase mb-4';
};

export const getFooterLinkClasses = () => {
  return 'text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 block mb-2';
};
