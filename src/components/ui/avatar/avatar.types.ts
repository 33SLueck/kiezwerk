import type { ReactNode } from 'react';

export interface AvatarProps {
  className?: string;
  children?: ReactNode;
}

export interface AvatarImageProps {
  src: string;
  alt: string;
  className?: string;
}

export interface AvatarFallbackProps {
  children: ReactNode;
  className?: string;
}
