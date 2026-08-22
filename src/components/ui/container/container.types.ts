import * as React from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'full';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  border?: 'none' | 'neutral' | 'subtle';
  asChild?: boolean;
}
