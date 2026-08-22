export const getFormFieldContainerClasses = (className?: string) => {
  return ['flex flex-col gap-1.5 w-full', className].filter(Boolean).join(' ');
};

export const getFormFieldLabelClasses = (required?: boolean) => {
  return [
    'text-sm font-medium text-foreground',
    required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : '',
  ].join(' ');
};
