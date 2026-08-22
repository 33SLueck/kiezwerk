export const getRadioGroupClasses = (className?: string) => {
  return ['flex flex-col gap-2', className].filter(Boolean).join(' ');
};

export const getRadioItemClasses = (disabled?: boolean) => {
  return [
    'flex items-center gap-3 cursor-pointer select-none',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ');
};

export const getRadioInputClasses = () => {
  return 'h-4 w-4 rounded-full border-border text-foreground focus:ring-ring focus:ring-offset-2';
};

export const getRadioLabelClasses = () => {
  return 'text-sm font-medium text-foreground';
};
