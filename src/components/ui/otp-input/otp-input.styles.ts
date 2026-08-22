export const getOtpContainerClasses = (className?: string) => {
  return ['flex gap-2 justify-center items-center', className].filter(Boolean).join(' ');
};

export const getOtpInputItemClasses = (error?: boolean) => {
  return [
    'w-10 h-12 text-center text-lg font-bold border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150',
    error ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-foreground',
  ].join(' ');
};
