/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { dataTableVariants } from './data-table.styles';

export interface ColumnDef<T = any> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dataTableVariants> {
  title?: string;
  description?: string;
  columns: ColumnDef<T>[];
  data: T[];
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  actions?: React.ReactNode;
}
