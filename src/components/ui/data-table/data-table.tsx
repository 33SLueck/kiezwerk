/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Input } from '@/components/ui/input';
import { dataTableVariants } from './data-table.styles';
import type { DataTableProps } from './data-table.types';

export const DataTable = <T extends Record<string, any>>({
  title,
  description,
  columns,
  data,
  searchPlaceholder = 'Search table...',
  onSearchChange,
  actions,
  variant,
  className,
  ...props
}: DataTableProps<T>) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    onSearchChange?.(val);
  };

  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) => val && String(val).toLowerCase().includes(query))
    );
  }, [data, searchQuery]);

  return (
    <div className={cn(dataTableVariants({ variant }), className)} {...props}>
      {/* Table Header Controls */}
      {(title || description || actions || searchPlaceholder) && (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 border-b border-border/60">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
            )}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {searchPlaceholder && (
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9 text-xs h-9"
                />
              </div>
            )}
            {actions}
          </div>
        </div>
      )}

      {/* Table Body */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs text-foreground">
          <thead className="bg-muted/40 border-b border-border/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground select-none">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-5 py-3.5">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-8 text-center text-muted-foreground"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr
                  key={(row.id as string) || index}
                  className="transition-colors hover:bg-muted/30"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 whitespace-nowrap">
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
