export const getFileUploadContainerClasses = (
  isDragActive: boolean,
  disabled: boolean,
  className?: string
) => {
  return [
    'flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors duration-200 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
    isDragActive
      ? 'border-foreground bg-accent/20'
      : 'border-border bg-background hover:bg-accent/10',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
};
