import type { AlertVariant } from './alert.types';

const baseAlertClasses = 'flex gap-3 rounded-xl border p-4';

const variantClasses: Record<AlertVariant, string> = {
  default: 'border-border bg-card text-card-foreground',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-foreground',
  warning: 'border-amber-500/30 bg-amber-500/10 text-foreground',
  destructive: 'border-destructive/30 bg-destructive/10 text-foreground',
  info: 'border-blue-500/30 bg-blue-500/10 text-foreground',
};

export const getAlertClasses = (variant: AlertVariant = 'default') => {
  return [baseAlertClasses, variantClasses[variant]].filter(Boolean).join(' ');
};
