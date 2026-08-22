import * as React from 'react';
import type { TooltipProps } from './tooltip.types';
import { tooltipVariants } from './tooltip.styles';

export const Tooltip = ({ content, children, position = 'top', className }: TooltipProps) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div role="tooltip" className={tooltipVariants({ position, className })}>
        {content}
      </div>
    </div>
  );
};
