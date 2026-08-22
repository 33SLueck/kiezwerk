import * as React from 'react';

export type AlertVariant = 'default' | 'success' | 'warning' | 'destructive' | 'info';

export interface AlertProps {
  className?: string;
  variant?: AlertVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}
