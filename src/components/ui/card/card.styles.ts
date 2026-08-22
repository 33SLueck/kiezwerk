import type { CardPadding, CardVariant } from './card.types';

const baseCardClasses = 'rounded-xl border shadow-sm';

const variantClasses: Record<CardVariant, string> = {
  default: 'border-border bg-card text-card-foreground',
  muted: 'border-border bg-muted text-foreground',
  outline: 'border-border bg-background text-foreground',
};

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export const getCardClasses = (variant: CardVariant = 'default', padding: CardPadding = 'md') => {
  return [baseCardClasses, variantClasses[variant], paddingClasses[padding]]
    .filter(Boolean)
    .join(' ');
};
