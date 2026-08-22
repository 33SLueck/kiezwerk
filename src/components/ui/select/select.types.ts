import type { SelectHTMLAttributes, ReactNode } from 'react';

export type SelectVariant = 'default';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  variant?: SelectVariant;
  options: SelectOption[];
  placeholder?: string;
}
