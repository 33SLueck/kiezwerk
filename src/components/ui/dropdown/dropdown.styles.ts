export const getDropdownClasses = (className?: string) => {
  return ['relative inline-block text-left', className].filter(Boolean).join(' ');
};

export const getDropdownMenuClasses = (isOpen: boolean) => {
  return [
    'absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-background border border-border shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-100',
    isOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none',
  ].join(' ');
};

export const getDropdownItemClasses = (disabled?: boolean) => {
  return [
    'block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-150',
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
  ].join(' ');
};
