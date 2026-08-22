export const getDatePickerClasses = (error?: boolean, className?: string) => {
  return [
    'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150',
    error ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-foreground',
    className,
  ]
    .filter(Boolean)
    .join(' ');
};
