import * as React from 'react';

export type CardElement = 'div' | 'section' | 'article';

export type CardVariant = 'default' | 'muted' | 'outline';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: CardElement;
  variant?: CardVariant;
  padding?: CardPadding;
}
