import * as React from 'react';

export type GridElement = 'div' | 'section' | 'main' | 'ul' | 'ol' | 'article';

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 'auto';

export type GridBreakpoint = 'initial' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveGridColumns = Partial<Record<GridBreakpoint, GridColumns>>;

export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export type GridAlign = 'start' | 'center' | 'end' | 'stretch';

export type GridJustify = 'start' | 'center' | 'end' | 'between';

export interface GridProps {
  children: React.ReactNode;
  className?: string;
  as?: GridElement;
  columns?: GridColumns;
  responsiveColumns?: ResponsiveGridColumns;
  gap?: GridGap;
  align?: GridAlign;
  justify?: GridJustify;
}
