import * as React from 'react';
import type { SpinnerProps } from './spinner.types';
import { spinnerVariants } from './spinner.styles';

export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={spinnerVariants({ size, className })}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
