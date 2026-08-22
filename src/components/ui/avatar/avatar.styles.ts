const rootClasses = 'relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted';

const imageClasses = 'h-full w-full object-cover';

const fallbackClasses =
  'flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-foreground';

export const getAvatarClasses = (className?: string) => {
  return [rootClasses, className].filter(Boolean).join(' ');
};

export const getAvatarImageClasses = (className?: string) => {
  return [imageClasses, className].filter(Boolean).join(' ');
};

export const getAvatarFallbackClasses = (className?: string) => {
  return [fallbackClasses, className].filter(Boolean).join(' ');
};
