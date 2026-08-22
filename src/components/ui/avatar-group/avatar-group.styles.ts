export const getAvatarGroupClasses = (className?: string) => {
  return ['flex -space-x-2 overflow-hidden', className].filter(Boolean).join(' ');
};

export const getAvatarGroupItemClasses = () => {
  return 'inline-block ring-2 ring-background';
};

export const getAvatarGroupMoreClasses = () => {
  return 'flex items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground ring-2 ring-background h-10 w-10';
};
