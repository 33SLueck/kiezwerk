export const getFormHelperClasses = (error: boolean, className?: string) => {
  return [
    'text-xs mt-1 transition-colors duration-150 block',
    error ? 'text-red-500' : 'text-muted-foreground',
    className,
  ]
    .filter(Boolean)
    .join(' ');
};
