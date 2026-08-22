'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { adminChartVariants } from './admin-chart.styles';
import type { AdminChartProps } from './admin-chart.types';

export const AdminChart: React.FC<AdminChartProps> = ({
  title,
  subtitle,
  data,
  height = 220,
  valuePrefix = '$',
  valueSuffix = '',
  variant,
  className,
  ...props
}) => {
  const maxValue = React.useMemo(() => {
    if (!data || data.length === 0) return 100;
    return Math.max(...data.map((d) => d.value)) * 1.15;
  }, [data]);

  const [activePoint, setActivePoint] = React.useState<number | null>(null);

  return (
    <div className={cn(adminChartVariants({ variant }), className)} {...props}>
      {(title || subtitle) && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
            )}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          {activePoint !== null && data[activePoint] && (
            <div className="text-right">
              <span className="text-xs font-medium text-muted-foreground">
                {data[activePoint].label}:
              </span>
              <span className="ml-1 text-sm font-bold text-primary">
                {valuePrefix}
                {data[activePoint].value.toLocaleString()}
                {valueSuffix}
              </span>
            </div>
          )}
        </div>
      )}

      {/* SVG Bar Chart Diagram */}
      <div className="w-full overflow-hidden pt-4">
        <div
          className="flex items-end justify-between gap-2 md:gap-4 w-full"
          style={{ height: `${height}px` }}
        >
          {data.map((point, idx) => {
            const heightPercentage = Math.max(8, Math.round((point.value / maxValue) * 100));
            const isHovered = activePoint === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActivePoint(idx)}
                onMouseLeave={() => setActivePoint(null)}
                className="group relative flex flex-1 flex-col items-center justify-end h-full cursor-pointer"
              >
                {/* Bar Tooltip */}
                <div
                  className={cn(
                    'absolute -top-8 z-20 whitespace-nowrap rounded bg-popover px-2 py-1 text-[10px] font-bold text-popover-foreground shadow-md transition-all duration-200 pointer-events-none',
                    isHovered
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-1 scale-95'
                  )}
                >
                  {valuePrefix}
                  {point.value.toLocaleString()}
                  {valueSuffix}
                </div>

                {/* Animated Column Bar */}
                <div className="flex-1 w-full max-w-[42px] rounded-t-md bg-muted/20 overflow-hidden flex items-end">
                  <div
                    className={cn(
                      'w-full rounded-t-md transition-all duration-500 ease-out shadow-xs',
                      isHovered
                        ? 'bg-gradient-to-t from-primary to-primary/80 shadow-primary/20'
                        : 'bg-gradient-to-t from-primary/80 to-primary/60 group-hover:from-primary group-hover:to-primary/80'
                    )}
                    style={{ height: `${heightPercentage}%` }}
                  />
                </div>

                {/* Label */}
                <span
                  className={cn(
                    'mt-2 text-[10px] font-semibold transition-colors truncate w-full text-center',
                    isHovered ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
