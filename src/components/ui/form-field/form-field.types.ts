import type { ReactNode } from 'react';

export interface FormFieldProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}
