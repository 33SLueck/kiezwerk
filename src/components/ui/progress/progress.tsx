import * as React from 'react';
import type { ProgressProps } from './progress.types';
import { getProgressContainerClasses, getProgressBarClasses } from './progress.styles';

export const Progress = ({ value, max = 100, className }: ProgressProps) => {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={getProgressContainerClasses(className)}
    >
      <div
        className={getProgressBarClasses()}
        style={{ transform: `translateX(-${100 - percent}%)` }}
      />
    </div>
  );
};
