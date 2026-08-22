import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { adminChartVariants } from './admin-chart.styles';

export interface ChartDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface AdminChartProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof adminChartVariants> {
  title?: string;
  subtitle?: string;
  data: ChartDataPoint[];
  height?: number;
  valuePrefix?: string;
  valueSuffix?: string;
}
