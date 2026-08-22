import type React from 'react';

type TextElement = 'p' | 'span';

export type TextProps<E extends TextElement = 'p'> = {
  as?: E;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'default' | 'muted' | 'highlight';
} & React.ComponentPropsWithoutRef<E>;
