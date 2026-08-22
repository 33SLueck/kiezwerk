import type { ReactNode } from 'react';

export interface FormHelperProps {
  children: ReactNode;
  error?: boolean;
  className?: string;
  id?: string;
}
