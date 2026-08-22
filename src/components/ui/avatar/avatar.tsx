'use client';

import { useState } from 'react';
import type { AvatarFallbackProps, AvatarImageProps, AvatarProps } from './avatar.types';
import { getAvatarClasses, getAvatarFallbackClasses, getAvatarImageClasses } from './avatar.styles';

export const Avatar = ({ className, children }: AvatarProps) => {
  return <span className={getAvatarClasses(className)}>{children}</span>;
};

export const AvatarImage = ({ src, alt, className }: AvatarImageProps) => {
  const [error, setError] = useState(false);

  if (!src || error) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={getAvatarImageClasses(className)}
      onError={() => setError(true)}
    />
  );
};

export const AvatarFallback = ({ children, className }: AvatarFallbackProps) => {
  return <span className={getAvatarFallbackClasses(className)}>{children}</span>;
};
