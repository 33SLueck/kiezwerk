import type { TrustBarVariant } from './trustBar.types';

const baseTrustBarClasses = 'w-full border-y border-border bg-background';

const variantClasses: Record<TrustBarVariant, string> = {
  logos: 'py-6',
  stats: 'py-8',
};

const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8';

const titleClasses = 'text-sm font-medium text-muted-foreground';

const listClasses: Record<TrustBarVariant, string> = {
  logos: 'flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-10',
  stats: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
};

const itemClasses: Record<TrustBarVariant, string> = {
  logos: 'flex items-center justify-center text-sm font-medium text-muted-foreground',
  stats:
    'rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium text-foreground',
};

export const getTrustBarClasses = (variant: TrustBarVariant = 'logos', className?: string) => {
  return [baseTrustBarClasses, variantClasses[variant], className].filter(Boolean).join(' ');
};

export const getTrustBarInnerClasses = () => {
  return [innerClasses].filter(Boolean).join(' ');
};

export const getTrustBarTitleClasses = () => {
  return [titleClasses].filter(Boolean).join(' ');
};

export const getTrustBarListClasses = (variant: TrustBarVariant = 'logos') => {
  return [listClasses[variant]].filter(Boolean).join(' ');
};

export const getTrustBarItemClasses = (variant: TrustBarVariant = 'logos') => {
  return [itemClasses[variant]].filter(Boolean).join(' ');
};
