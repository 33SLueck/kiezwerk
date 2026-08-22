import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxVariant = 'default';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  variant?: CheckboxVariant;
}
