import type {
  GridAlign,
  GridBreakpoint,
  GridColumns,
  GridGap,
  GridJustify,
  ResponsiveGridColumns,
} from './grid.types';

const baseGridClasses = 'grid';

const columnClasses: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  auto: 'grid-flow-col auto-cols-fr',
};

const breakpointClasses: Record<Exclude<GridBreakpoint, 'initial'>, string> = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  '2xl': '2xl:',
};

const gapClasses: Record<GridGap, string> = {
  none: 'gap-0',
  xs: 'gap-2',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

const alignClasses: Record<GridAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClasses: Record<GridJustify, string> = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
  between: 'justify-items-stretch',
};

const buildResponsiveColumnClasses = (responsiveColumns?: ResponsiveGridColumns) => {
  if (!responsiveColumns) return [];

  return (Object.entries(responsiveColumns) as [GridBreakpoint, GridColumns][])
    .filter(([, value]) => value !== undefined)
    .map(([breakpoint, value]) => {
      const columnClass = columnClasses[value];
      if (breakpoint === 'initial') return columnClass;
      return `${breakpointClasses[breakpoint]}${columnClass}`;
    });
};

export const getGridClasses = (
  columns: GridColumns = 1,
  gap: GridGap = 'md',
  align: GridAlign = 'stretch',
  justify: GridJustify = 'start',
  responsiveColumns?: ResponsiveGridColumns
) => {
  const responsiveClasses = buildResponsiveColumnClasses(responsiveColumns);
  const baseColumnClass = responsiveColumns?.initial ? '' : columnClasses[columns];

  return [
    baseGridClasses,
    baseColumnClass,
    ...responsiveClasses,
    gapClasses[gap],
    alignClasses[align],
    justifyClasses[justify],
  ]
    .filter(Boolean)
    .join(' ');
};
