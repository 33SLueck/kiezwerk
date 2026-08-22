export const getSwitchContainerClasses = (disabled?: boolean, className?: string) => {
  return [
    'inline-flex items-center cursor-pointer select-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
};

export const getSwitchTrackClasses = (checked: boolean) => {
  return [
    'relative h-6 w-11 rounded-full transition-colors duration-200',
    checked ? 'bg-foreground' : 'bg-muted',
  ].join(' ');
};

export const getSwitchThumbClasses = (checked: boolean) => {
  return [
    'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 top-0.5 absolute left-0.5',
    checked ? 'translate-x-5' : 'translate-x-0',
  ].join(' ');
};
