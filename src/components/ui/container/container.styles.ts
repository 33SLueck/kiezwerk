import type { ContainerSize } from './container.types';

const baseContainerClasses = 'w-full mx-auto px-4 sm:px-6 lg:px-8'; // horizontales Padding + Zentrierung

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-screen-md', // ~768px
  md: 'max-w-screen-lg', // ~1024px
  lg: 'max-w-screen-xl', // ~1280px oder Custom-XL
  full: 'max-w-none', // keine Begrenzung
};

const borderClasses: Record<
  NonNullable<import('./container.types').ContainerProps['border']>,
  string
> = {
  none: '',
  neutral: 'border border-gray-200 dark:border-gray-700',
  subtle: 'border border-gray-100 dark:border-gray-800',
};

export const getContainerClasses = (
  size: ContainerSize = 'md',
  border: import('./container.types').ContainerProps['border'] = 'none'
) => {
  const sizeClass = sizeClasses[size];
  const borderClass = border ? (borderClasses[border] ?? '') : '';
  return [baseContainerClasses, sizeClass, borderClass].filter(Boolean).join(' ');
};
